import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown"; // Usamos Dropdown directamente.

export default function Caminadores({
  onClose,
  caminadoresData,
  setCaminadoresData,
}) {
  const productos = [
    {
      producto: "CISLIN",
      principioActivo: "DELTAMETRINA",
      laboratorio: "BAYER, ENVU",
      numeroCertificado: "C.A-250056",
    },
    {
      producto: "PERFENO",
      principioActivo: "Propoxur 20 %",
      laboratorio: "CHEMOTECNICA",
      numeroCertificado: "C.A-0250030",
    },
    {
      producto: "PROTEGINAL",
      principioActivo: "Cipermetrina 20 % emul",
      laboratorio: "CHEMOTECNICA",
      numeroCertificado: "C.S- 375 / C.A- 0250010",
    },
    {
      producto: "CHEMONIL",
      principioActivo: "Fipronil 2 %",
      laboratorio: "CHEMOTECNICA",
      numeroCertificado: "C.A-0250103",
    },
    {
      producto: "DEMOLEDOR",
      principioActivo: "Betacipermetrina + Lufenuron",
      laboratorio: "CHEMOTECNICA",
      numeroCertificado: "C.S-3250 / C.A-0250101",
    },
    {
      producto: "ASI-NET",
      principioActivo: "CIPERMETRINA 5% + BUTOXIDO DE PIPERONILO 15 %",
      laboratorio: "CHEMOTECNICA",
      numeroCertificado: "C-2907",
    },
    {
      producto: "DEPE",
      principioActivo: "Permetrina 10 % (80% Hcis)",
      laboratorio: "CHEMOTECNICA",
      numeroCertificado: "C.A-0250082",
    },
    {
      producto: "K-OBIOL",
      principioActivo: "DELTAMETRINA 2,5G/100ML",
      laboratorio: "BAYER, ENVU",
      numeroCertificado: "C.S- 30.997",
    },
    {
      producto: "FENDONA 6 SC",
      principioActivo: "ALFA-CIPERMETRINA 6%",
      laboratorio: "BAYER, ENVU",
      numeroCertificado: "C.S-0566 / C.A-0270002",
    },
    {
      producto: "Formidor® CEBO",
      principioActivo: "FIPRONIL 0,003%",
      laboratorio: "BAYER, ENVU",
      numeroCertificado: "C.S-00284",
    },
    {
      producto: "GELTEK HORMIGAS",
      principioActivo: "Imidacloprid 2,15%",
      laboratorio: "GELTEK",
      numeroCertificado: null,
    },
    {
      producto: "DAST POLVO",
      principioActivo: "Deltametrina 0,2%",
      laboratorio: "GLEBA S.A",
      numeroCertificado: "C.S- 0250016 /C.A- 0250016",
    },
    {
      producto: "FLY HUNT-ATRAP. MOSCAS",
      principioActivo: "ECOLOGICO- NO TOXICO",
      laboratorio: "FLY HUNT",
      numeroCertificado: "NO TOXICO",
    },
  ];

  const [ubicacionCaminadores, setUbicacionCaminadores] = useState(""); // Estado para manejar el texto del input
  const [selectedProductoCaminadores, setSelectedProductoCaminadores] =
    useState(""); // Estado para manejar la selección en el Dropdown
  const [
    selectedPrincipioActivoCaminadores,
    setSelectedPrincipioActivoCaminadores,
  ] = useState("");
  const [selectedLaboratorioCaminadores, setSelectedLaboratorioCaminadores] =
    useState("");
  const [selectedCertificados, setSelectedCertificados] = useState("");
  const [observacionesCaminadores, setObservacionesCaminadores] = useState("");

  const LimpiarCaminadores = () => {
    setUbicacionCaminadores("");
    setSelectedProductoCaminadores("");
    setSelectedPrincipioActivoCaminadores("");
    setSelectedLaboratorioCaminadores("");
    setSelectedCertificados("");
    setObservacionesCaminadores("");
  };

  // Se ejecuta cuando se selecciona un producto
  useEffect(() => {
    if (selectedProductoCaminadores) {
      const productoSeleccionado = productos.find(
        (producto) => producto.producto === selectedProductoCaminadores,
      );
      if (productoSeleccionado) {
        setSelectedPrincipioActivoCaminadores(
          productoSeleccionado.principioActivo,
        );
        setSelectedLaboratorioCaminadores(productoSeleccionado.laboratorio);
        setSelectedCertificados(productoSeleccionado.numeroCertificado);
      }
    }
  }, [selectedProductoCaminadores]);

  return (
    <ScrollView>
      <View style={styles.caminadoresContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setUbicacionCaminadores(value)}
          value={ubicacionCaminadores}
          placeholder="Ubicación:"
        />
        <Dropdown
          data={productos.map((producto) => ({
            label: producto.producto,
            value: producto.producto,
          }))}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedProductoCaminadores}
          placeholder="Producto utilizado:"
          onChange={(item) => {
            setSelectedProductoCaminadores(item.value);
          }}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
        />
        <Dropdown
          data={[
            {
              label: selectedPrincipioActivoCaminadores,
              value: selectedPrincipioActivoCaminadores,
            },
          ]}
          search={false}
          labelField="label"
          valueField="value"
          value={selectedPrincipioActivoCaminadores}
          placeholder="Principio Activo:"
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />
        <Dropdown
          data={[
            {
              label: selectedLaboratorioCaminadores,
              value: selectedLaboratorioCaminadores,
            },
          ]}
          search={false}
          labelField="label"
          valueField="value"
          value={selectedLaboratorioCaminadores}
          placeholder="Laboratorio:"
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />
        <Dropdown
          data={[{ label: selectedCertificados, value: selectedCertificados }]}
          search={false}
          labelField="label"
          valueField="value"
          value={selectedCertificados}
          placeholder="Certificados:"
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setObservacionesCaminadores(value)}
          value={observacionesCaminadores}
          placeholder="Observaciones:"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                !ubicacionCaminadores ||
                !selectedProductoCaminadores ||
                !selectedPrincipioActivoCaminadores ||
                !selectedLaboratorioCaminadores ||
                !selectedCertificados
              ) {
                alert("Por favor, complete todos los campos");
                return;
              } else {
                const newEntry = {
                  Ubicación: ubicacionCaminadores,
                  Producto: selectedProductoCaminadores,
                  PrincipioActivo: selectedPrincipioActivoCaminadores,
                  Laboratorio: selectedLaboratorioCaminadores,
                  Certificados: selectedCertificados,
                  Observaciones: observacionesCaminadores,
                };
                setCaminadoresData((prev) => [...prev, newEntry]); // Agrega el nuevo registro
                LimpiarCaminadores();
              }
              alert("Datos guardados correctamente");
            }}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => {
              if (caminadoresData.length > 0) {
                // Eliminar el último registro de los datos
                setCaminadoresData((prev) => prev.slice(0, -1));
                alert("Último registro eliminado");
              } else {
                alert("No hay registros para eliminar");
              }
              LimpiarCaminadores();
            }}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        {caminadoresData.length > 0 && (
          <View style={styles.spreadsheet}>
            <View style={[styles.containerData, styles.headerData]}>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Ubicación
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Producto
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Principio Activo
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Laboratorio
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Certificado
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Observaciones
              </Text>
            </View>
            {caminadoresData.map((data, index) => (
              <View key={index} style={styles.containerData}>
                <Text style={[styles.column]}>{data.Ubicación}</Text>
                <Text style={[styles.column]}>{data.Producto}</Text>
                <Text style={[styles.column]}>{data.PrincipioActivo}</Text>
                <Text style={[styles.column]}>{data.Laboratorio}</Text>
                <Text style={[styles.column]}>{data.Certificados}</Text>
                <Text style={[styles.column]}>{data.Observaciones}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  caminadoresContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 20,
    paddingVertical: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdown: {
    height: 50,
    borderColor: "#B0BEC5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#90A4AE",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#263238",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#B0BEC5",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#263238",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  buttonSecondary: {
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
  spreadsheet: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    borderRadius: 8,
    overflow: "hidden",
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CFD8DC",
  },
  headerData: {
    backgroundColor: "#007AFF",
    borderBottomWidth: 2,
    borderBottomColor: "#005BB5",
  },
  titledatoscajas: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    color: "#FFF",
  },
  datoscajas: {
    fontSize: 10,
    textAlign: "center",
    color: "#37474F",
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
});
