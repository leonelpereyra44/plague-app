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

  // const densidad = [
  //   { label: "Baja", value: "baja" },
  //   { label: "Media", value: "media" },
  //   { label: "Alta", value: "alta" },
  // ];

  // const reposicion = [
  //   { label: "No", value: "no" },
  //   { label: "Sí", value: "si" },
  // ];

  // Estados para manejar los caminadores
  // const [selectedCaja, setSelectedCaja] = useState("");
  // const [selectedDensidad, setSelectedDensidad] = useState("");
  // const [selectedReposicion, setSelectedReposicion] = useState("");
  const [selectedObservaciones, setSelectedObservaciones] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  // Funciones para limpiar los campos
  const Limpiar = () => {
    // setSelectedCaja("");
    // setSelectedDensidad("");
    // setSelectedReposicion("");
    setSelectedObservaciones("");
    setUbicacion("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tarjeta de ingreso de datos */}
      <View style={styles.card}>
        {/* <TextInput
          style={styles.input}
          placeholder="Caja N°:"
          value={selectedCaja}
          onChangeText={(text) => setSelectedCaja(text)}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Ubicación:"
          value={ubicacion}
          onChangeText={(text) => setUbicacion(text)}
        />
        {/* <Dropdown
          data={densidad}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedDensidad}
          placeholder="Densidad:"
          onChange={(item) => {
            setSelectedDensidad(item.value);
          }}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
        /> */}
        {/* <Dropdown
          data={reposicion}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedReposicion}
          placeholder="Reposición:"
          onChange={(item) => {
            setSelectedReposicion(item.value);
          }}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Observaciones"
          value={selectedObservaciones}
          onChangeText={(text) => setSelectedObservaciones(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (!ubicacion) {
                alert("Por favor, complete todos los campos");
                return;
              } else {
                const newEntry = {
                  // Caja: selectedCaja,
                  Ubicación: ubicacion,
                  // Densidad: selectedDensidad,
                  // Reposición: selectedReposicion,
                  Observaciones: selectedObservaciones,
                };
                setCaminadoresData((prevData) => {
                  const updatedData = [...prevData, newEntry];
                  updatedData.sort((a, b) => a.Caja - b.Caja);
                  return updatedData;
                });
                Limpiar();
                alert("Datos guardados correctamente");
              }
            }}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => {
              if (caminadoresData.length > 0) {
                setCaminadoresData((prev) => prev.slice(0, -1));
                alert("Último registro eliminado");
              } else {
                alert("No hay registros para eliminar");
              }
              Limpiar();
            }}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Tarjeta para visualizar los datos */}
      {caminadoresData.length > 0 && (
        <View style={styles.spreadsheet}>
          <View style={[styles.containerData, styles.headerData]}>
            {/* <Text style={[styles.titledatoscajas, styles.column]}>Caja N°</Text> */}
            <Text style={[styles.titledatoscajas, styles.column]}>
              Ubicación
            </Text>
            {/* <Text style={[styles.titledatoscajas, styles.column]}>
              Densidad
            </Text> */}
            {/* <Text style={[styles.titledatoscajas, styles.column]}>
              Reposición
            </Text> */}
            <Text style={[styles.titledatoscajas, styles.column]}>
              Observaciones
            </Text>
          </View>
          {caminadoresData.map((entry, index) => (
            <View style={styles.containerData} key={index}>
              {/* <Text style={[styles.datoscajas, styles.column]}>
                {entry.Caja}
              </Text> */}
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.Ubicación}
              </Text>
              {/* <Text style={[styles.datoscajas, styles.column]}>
                {entry.Densidad}
              </Text> */}
              {/* <Text style={[styles.datoscajas, styles.column]}>
                {entry.Reposición}
              </Text> */}
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.Observaciones}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#1b3b4f", // Fondo similar al del logo
  },
  card: {
    marginBottom: 20,
    padding: 20,
    gap: 20,
    backgroundColor: "#FFFFFF",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#28A745",
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
    backgroundColor: "#DC3545",
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
    borderRadius: 8,
    overflow: "hidden", // Evita que el contenido sobresalga
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#FFF",
  },
  headerData: {
    backgroundColor: "#007AFF",
    borderBottomWidth: 2,
    borderBottomColor: "#005BB5",
  },
  titledatoscajas: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    color: "#FFF",
  },
  datoscajas: {
    fontSize: 12,
    textAlign: "center",
    color: "#263238",
  },
  column: {
    flex: 1,
  },
});
