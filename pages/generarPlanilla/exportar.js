import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";
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
  // Lista de usuarios con sus firmas
  const usuario = [
    {
      label: "Pereyra Mariano",
      nombre: "PEREYRA MARIANO",
      habilitacion: "233/15 - 1257/22",
      cargo: "TECNICO OPERARIO APLICADOR",
      // dni: "123",
      // firma: require("./img/sellomariano.jpeg"),
    },
    {
      label: "Pereyra Agustín",
      nombre: "PEREYRA AGUSTIN",
      habilitacion: "233/15 - 1257/22",
      cargo: "OPERARIO APLICADOR",
      // dni: "456",
      // firma: require("./img/selloagustin.jpeg"),
    },
  ];
  console.log("Usuarios iniciales:", usuario);

  const [selectedUsuario, setSelectedUsuario] = useState("");
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [usuarioData, setUsuarioData] = useState([]);
  const [observaciones, setObservaciones] = useState("");

  const handleGuardarUsuario = async () => {
    console.log("Estado de usuario antes de guardar:", usuario);
    console.log("Usuario seleccionado para guardar:", selectedUsuario);
    if (!selectedUsuario) {
      Alert.alert("Error", "Seleccione un usuario");
      return;
    }
    try {
      // Buscar el usuario seleccionado
      const selectedUsuarioData = usuario.find(
        (item) => item.nombre === selectedUsuario, // Comparar con nombre
      );
      if (!selectedUsuarioData) {
        Alert.alert("Error", "El usuario seleccionado no es válido.");
        return;
      }
      console.log("Usuario seleccionado completo:", selectedUsuarioData);
      // Guardar el usuario con su firma en el estado
      setUsuarioData([selectedUsuarioData]);
      // Deshabilitar el dropdown
      setIsDropdownDisabled(true);
      console.log("Usuario guardado con éxito.");
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      Alert.alert("Error", "No se pudo guardar el usuario.");
    }
  };

  // Definir las secciones de datos
  const dataSections = [
    { title: "Empresa", data: clienteData || [] },
    { title: "Productos", data: productosData || [] },
    { title: "Roedores", data: roedoresData || [] },
    { title: "Rastreros", data: rastrerosData || [] },
    { title: "Voladores", data: voladoresData || [] },
    { title: "Observaciones", data: [{ observaciones }] },
  ];

  // Si no hay datos en ninguna sección, mostrar mensaje
  const isEmpty = dataSections.every((section) => section.data.length === 0);

  const handleExportToPDF = async () => {
    try {
      // Construcción del contenido HTML
      let htmlContent = `<h1 style="text-align:center; color: black;">Planilla de M.I.P SAN AGUSTIN</h1>`;

      dataSections.forEach(({ title, data }) => {
        if (data.length > 0) {
          htmlContent += `<h2 style="text-align:left; color: #333;">${title}</h2>`;
          htmlContent += `<table style="width: 100%; border-collapse: collapse; font-size: 12px;">`;

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
        <div style="margin-top: 40px; text-align: center;">
          <div style="display: inline-flex; align-items: center; gap: 40px;">
            <div style="text-align: center;">
              <p style="margin-top: 5px; font-size: 16px; font-weight: bold;">SAN AGUSTIN C.I.P</p>
              <p style="font-size: 14px;">${nombre}</p>
              <p style="font-size: 14px;">HAB: ${habilitacion}</p>
              <p style="margin-top: 5px; font-size: 12px;">${cargo}</p>
            </div>
          </div> 
        </div>`;

      // Verifica que clienteData es un objeto y contiene las propiedades
      const clienteDataObj = clienteData[0] || {}; // Asumiendo que clienteData es un array
      const {
        cliente = "ClienteDesconocido",
        planta = "PlantaDesconocida",
        fecha = "FechaDesconocida",
      } = clienteDataObj;
      const nombreArchivo = `${cliente}-${planta}-${fecha}.pdf`.replace(
        /\s+/g,
        "_",
      );

      console.log(htmlContent);

      // Generar el PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log(`PDF generado en: ${uri}`);

      // Renombrar el archivo
      const newUri = `${FileSystem.documentDirectory}${nombreArchivo}`;
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });
      console.log(`PDF renombrado a: ${newUri}`);

      // Compartir el PDF
      await Sharing.shareAsync(newUri);
    } catch (error) {
      console.error("Error al manejar la exportación:", error);
    }
  };

  const handleExportToXLSX = async () => {
    const sheetData = [];

    // Generar las filas con las secciones y sus datos
    dataSections.forEach(({ title, data }) => {
      // Título de la sección
      sheetData.push([title]);
      if (data.length > 0) {
        // Agregar encabezados
        const headers = Object.keys(data[0]);
        sheetData.push(headers);
        // Agregar filas
        data.forEach((row) => {
          sheetData.push(headers.map((header) => row[header] || "-"));
        });
      } else {
        // Mensaje si no hay datos
        sheetData.push(["No hay datos en esta sección."]);
      }
      // Agregar una fila vacía entre secciones
      sheetData.push([]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Consolidados");

    // Ajustar el ancho de las columnas al contenido
    const maxWidths = [];
    sheetData.forEach((row) => {
      row.forEach((cell, colIndex) => {
        const cellLength = (cell ? cell.toString() : "").length;
        maxWidths[colIndex] = Math.max(maxWidths[colIndex] || 0, cellLength);
      });
    });

    // Aplicar el ajuste de las columnas al worksheet
    worksheet["!cols"] = maxWidths.map((width) => ({ wch: width + 2 }));

    const excelData = XLSX.write(workbook, {
      type: "base64",
      bookType: "xlsx",
    });
    const fileUri = FileSystem.documentDirectory + "Datos_Consolidados.xlsx";

    await FileSystem.writeAsStringAsync(fileUri, excelData, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(fileUri);
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
        {/* Contenedor de Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleExportToPDF}>
            <Text style={styles.buttonText}>Exportar a PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleExportToXLSX}>
            <Text style={styles.buttonText}>Exportar a XLSX</Text>
          </TouchableOpacity>
        </View>
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
