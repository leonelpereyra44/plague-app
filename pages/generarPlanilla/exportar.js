import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-gesture-handler";

export default function Exportar({
  onClose,
  clienteData,
  productosData,
  roedoresData,
  rastrerosData,
  voladoresData,
}) {
  // Precargar imagenes
  useEffect(() => {
    async function preloadImages() {
      await Asset.loadAsync([
        require("../../assets/sellomariano.jpeg"),
        require("../../assets/selloagustin.jpeg"),
        require("../../assets/logoredondo.png"),
      ]);
    }
    preloadImages();
  }, []);

  const usuario = [
    {
      label: "Pereyra Mariano",
      nombre: "PEREYRA MARIANO",
      habilitacion: "233/15 - 1257/22",
      cargo: "TECNICO OPERARIO APLICADOR",
      firma: require("../../assets/sellomariano.jpeg"),
    },
    {
      label: "Pereyra Agustín",
      nombre: "PEREYRA AGUSTIN",
      habilitacion: "233/15 - 1257/22",
      cargo: "OPERARIO APLICADOR",
      firma: require("../../assets/selloagustin.jpeg"),
    },
  ];

  const [selectedUsuario, setSelectedUsuario] = useState("");
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [usuarioData, setUsuarioData] = useState([]);
  const [observaciones, setObservaciones] = useState("");
  const [firmaBase64, setFirmaBase64] = useState(null);

  const [logoBase64, setLogoBase64] = useState(null);

  useEffect(() => {
    async function cargarLogo() {
      try {
        const [asset] = await Asset.loadAsync(
          require("../../assets/logoredondo.png"),
        );
        const fileUri = `${FileSystem.documentDirectory}${asset.name}`;

        await FileSystem.copyAsync({ from: asset.localUri, to: fileUri });

        const result = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setLogoBase64(result);
      } catch (error) {
        console.error("Error al cargar el logo:", error);
      }
    }
    cargarLogo();
  }, []);

  const cargarFirma = async (firmaRuta) => {
    try {
      const [asset] = await Asset.loadAsync(firmaRuta);
      const fileUri = `${FileSystem.documentDirectory}${asset.name}`;

      // Copiar la imagen a un directorio accesible
      await FileSystem.copyAsync({ from: asset.localUri, to: fileUri });

      const result = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setFirmaBase64(result);
    } catch (error) {
      console.error("Error al cargar la firma en producción:", error);
    }
  };

  const handleGuardarUsuario = async () => {
    if (!selectedUsuario) {
      Alert.alert("Error", "Seleccione un usuario");
      return;
    }
    try {
      const selectedUsuarioData = usuario.find(
        (item) => item.nombre === selectedUsuario,
      );
      if (!selectedUsuarioData) {
        Alert.alert("Error", "El usuario seleccionado no es válido.");
        return;
      }
      setUsuarioData([selectedUsuarioData]);
      setIsDropdownDisabled(true);
      await cargarFirma(selectedUsuarioData.firma); // Cargamos la firma en base64
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      Alert.alert("Error", "No se pudo guardar el usuario.");
    }
  };

  const dataSections = [
    { title: "Empresa", data: clienteData || [] },
    { title: "Productos", data: productosData || [] },
    { title: "Roedores", data: roedoresData || [] },
    { title: "Rastreros", data: rastrerosData || [] },
    { title: "Voladores", data: voladoresData || [] },
    { title: "Observaciones", data: [{ observaciones }] },
  ];

  const isEmpty = dataSections.every((section) => section.data.length === 0);

  const handleExportToPDF = async () => {
    try {
      if (!firmaBase64) {
        Alert.alert("Error", "Firma no cargada");
        return;
      }

      let htmlContent = `
  <div style="margin: 40px; padding: 20px;">

    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
      <img src="data:image/png;base64,${logoBase64}" alt="Logo" style="width: 100px; height: auto; margin-right: 10px;"/>
      <h1 style="margin: 0; color: black;">Planilla de M.I.P SAN AGUSTIN</h1>
    </div>

`;


      dataSections.forEach(({ title, data }) => {
        if (data.length > 0) {
          htmlContent += `<h2 style="text-align:left; color: #333;">${title}</h2>`;
          htmlContent += `<table style="width: 90%; margin: 0 auto; border-collapse: collapse; font-size: 12px;">`;


          const headers = Object.keys(data[0]);
          htmlContent += `<tr style="background-color: #f0f0f0;">`;
          headers.forEach((header) => {
            htmlContent += `<th style="border: 1px solid #ccc; padding: 8px; text-align: center; font-weight: bold;">${header}</th>`;
          });
          htmlContent += `</tr>`;

          data.forEach((row) => {
            htmlContent += `<tr>`;
            headers.forEach((header) => {
              htmlContent += `<td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${row[header] || "-"}</td>`;
            });
            htmlContent += `</tr>`;
          });

          htmlContent += `</table>`;
        }
      });

      const selectedUser = usuarioData[0];
      const { nombre, habilitacion, cargo } = selectedUser;

      htmlContent += `
        
        <div style="text-align: center; margin-top: 30px;">
          <img src="data:image/jpeg;base64,${firmaBase64}" alt="Firma" style="width: 200px; height: auto;" />
        </div>`;

      const clienteDataObj = clienteData[0] || {};
      const {
        cliente = "ClienteDesconocido",
        planta = "PlantaDesconocida",
        fecha = "FechaDesconocida",
      } = clienteDataObj;
      const nombreArchivo = `${cliente}-${planta}-${fecha}.pdf`.replace(
        /\s+/g,
        "_",
      );

      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      const newUri = `${FileSystem.documentDirectory}${nombreArchivo}`;
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      await Sharing.shareAsync(newUri);
    } catch (error) {
      console.error("Error al manejar la exportación:", error);
    }
  };

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No hay datos disponibles.</Text>
        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Planilla de M.I.P SAN AGUSTIN</Text>

        {dataSections.map(({ title, data }, sectionIndex) =>
          data.length > 0 ? (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <View style={[styles.containerData, styles.headerData]}>
                {Object.keys(data[0]).map((column, colIndex) => (
                  <Text
                    key={colIndex}
                    style={[styles.titledatoscajas, styles.column]}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}{" "}
                  </Text>
                ))}
              </View>
              {data.map((entry, rowIndex) => (
                <View style={styles.containerData} key={rowIndex}>
                  {Object.keys(entry).map((column, colIndex) => (
                    <Text
                      key={colIndex}
                      style={[styles.datoscajas, styles.column]}
                    >
                      {entry[column] ?? "-"}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          ) : null,
        )}

        {/* Contenedor observaciones */}
        <View style={styles.observacionesContainer}>
          <TextInput
            style={styles.observacionesInput}
            placeholder="Observaciones:"
            multiline
            numberOfLines={4}
            value={observaciones}
            onChangeText={setObservaciones}
          />
        </View>

        {/* Contenedor de usuario */}
        <View style={styles.usuarioContainer}>
          <Text style={styles.subtitle}>Seleccione un usuario</Text>
          <Dropdown
            data={usuario}
            labelField="label"
            valueField="nombre"
            value={selectedUsuario}
            placeholder="Seleccione usuario"
            onChange={(item) => setSelectedUsuario(item.nombre)}
            style={[
              styles.dropdown,
              isDropdownDisabled && styles.dropdownDisabled,
            ]}
          />
          {!isDropdownDisabled && (
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleGuardarUsuario}
              >
                <Text style={styles.saveButtonText}>Guardar Usuario</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleExportToPDF}>
          <Text style={styles.buttonText}>Exportar a PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerData: {
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  titledatoscajas: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
  datoscajas: {
    fontSize: 10,
    textAlign: "center",
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 10,
    color: "gray",
    marginTop: 10,
  },
  usuarioContainer: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: "#0074CC", // Azul intenso
    backgroundColor: "#E6F7FF", // Azul muy claro
  },
  dropdownDisabled: {
    backgroundColor: "#f0f0f0",
  },
  // Añadido al final del objeto `styles`
  observacionesContainer: {
    marginVertical: 20, // Espaciado vertical
    padding: 10, // Relleno interno
    borderRadius: 10, // Bordes redondeados
    borderWidth: 1, // Grosor del borde
    borderColor: "#6C757D", // Gris oscuro
    backgroundColor: "#F8F9FA", // Fondo gris claro
  },
  observacionesInput: {
    height: 100, // Altura del campo de texto
    textAlignVertical: "top", // Alinear texto al inicio (verticalmente)
    fontSize: 14, // Tamaño del texto
    color: "#212529", // Color del texto
    padding: 10, // Espaciado interno
    borderWidth: 1, // Grosor del borde
    borderRadius: 8, // Bordes redondeados
    borderColor: "#ADB5BD", // Color del borde gris
    backgroundColor: "#FFFFFF", // Fondo blanco
  },

  firmaImage: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginTop: 10,
  },
  saveButtonContainer: {
    marginTop: 15, // Separación superior
    alignItems: "center", // Centrar horizontalmente el botón
  },
  saveButton: {
    backgroundColor: "#007BFF", // Azul intenso
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8, // Bordes redondeados
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  saveButtonText: {
    color: "#FFF", // Texto blanco
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    gap: 12,
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#28A745", // Verde para "Agregar"
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonClose: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#DC3545", // Rojo para "Cerrar"
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
