import React, { useState } from "react";
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
  const productoCaminadores = [
    { label: "Producto 1", value: "Producto 1" },
    { label: "Producto 2", value: "Producto 2" },
    { label: "Producto 3", value: "Producto 3" },
    { label: "Producto 4", value: "Producto 4" },
    { label: "Producto 5", value: "Producto 5" },
  ];

  const principioActivoCaminadores = [
    { label: "Principio Activo 1", value: "Principio Activo 1" },
    { label: "Principio Activo 2", value: "Principio Activo 2" },
    { label: "Principio Activo 3", value: "Principio Activo 3" },
    { label: "Principio Activo 4", value: "Principio Activo 4" },
    { label: "Principio Activo 5", value: "Principio Activo 5" },
  ];

  const laboratorioCaminadores = [
    { label: "Laboratorio 1", value: "Laboratorio 1" },
    { label: "Laboratorio 2", value: "Laboratorio 2" },
    { label: "Laboratorio 3", value: "Laboratorio 3" },
    { label: "Laboratorio 4", value: "Laboratorio 4" },
    { label: "Laboratorio 5", value: "Laboratorio 5" },
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
  const [aprobacionSenasa, setAprobacionSenasa] = useState("");
  const [observacionesCaminadores, setObservacionesCaminadores] = useState("");

  const LimpiarCaminadores = () => {
    // Función para limpiar los campos de los caminadores
    setUbicacionCaminadores("");
    setSelectedProductoCaminadores("");
    setSelectedPrincipioActivoCaminadores("");
    setSelectedLaboratorioCaminadores("");
    setAprobacionSenasa("");
    setObservacionesCaminadores("");
  };

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
          data={productoCaminadores}
          search
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedProductoCaminadores} // Valor actualmente seleccionado
          placeholder="Producto utilizado:"
          onChange={(item) => {
            setSelectedProductoCaminadores(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={principioActivoCaminadores}
          search
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedPrincipioActivoCaminadores} // Valor actualmente seleccionado
          placeholder="Principio Activo:"
          onChange={(item) => {
            setSelectedPrincipioActivoCaminadores(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={laboratorioCaminadores}
          search
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedLaboratorioCaminadores} // Valor actualmente seleccionado
          placeholder="Laboratorio:"
          onChange={(item) => {
            setSelectedLaboratorioCaminadores(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setAprobacionSenasa(value)}
          value={aprobacionSenasa}
          placeholder="Aprobación Senasa:"
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
            style={styles.touchable}
            onPress={() => {
              if (
                !ubicacionCaminadores ||
                !selectedProductoCaminadores ||
                !selectedPrincipioActivoCaminadores ||
                !selectedLaboratorioCaminadores ||
                !aprobacionSenasa
              ) {
                alert("Por favor, complete todos los campos");
                return;
              } else {
                const newEntry = {
                  ubicacion: ubicacionCaminadores,
                  producto: selectedProductoCaminadores,
                  principioActivo: selectedPrincipioActivoCaminadores,
                  laboratorio: selectedLaboratorioCaminadores,
                  aprobacionSenasa: aprobacionSenasa,
                  observaciones: observacionesCaminadores,
                };
                setCaminadoresData((prev) => [...prev, newEntry]); // Agrega el nuevo registro
                //resetea los campos
                LimpiarCaminadores();
              }
              alert("Datos guardados correctamente");
            }}
          >
            <Text>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              onClose();
              LimpiarCaminadores();
            }}
          >
            <Text>Cerrar</Text>
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
                Aprobación Senasa
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Observaciones
              </Text>
            </View>
            {caminadoresData.map((entry, index) => (
              <View style={styles.containerData} key={index}>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.ubicacion}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.producto}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.principioActivo}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.laboratorio}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.aprobacionSenasa}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.observaciones}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  touchable: {
    margin: 8,
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 20,
  },
  caminadoresContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
  spreadsheet: {
    marginTop: 20,
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Línea divisoria para las filas
  },
  headerData: {
    backgroundColor: "#f0f0f0", // Fondo diferente para el encabezado
    borderBottomWidth: 2,
    borderBottomColor: "#000", // Línea más gruesa para encabezados
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
    flex: 1, // Cada columna ocupa la misma proporción
    textAlign: "center",
  },
});
