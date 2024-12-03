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

export default function Voladores({
  onClose,
  voladoresData,
  setVoladoresData,
}) {
  const ubicacionVoladores = [
    { label: "Filtro sanitario", value: "1" },
    { label: "Ingreso a producción", value: "2" },
    { label: "Dosificación", value: "3" },
    { label: "Camara de vapor", value: "4" },
    { label: "Pasillo de horno", value: "5" },
    { label: "Entrada de horno", value: "6" },
    { label: "Filtro horno", value: "7" },
    { label: "Salida horno", value: "8" },
    { label: "Ingreso envasado", value: "9" },
    { label: "Envasado", value: "10" },
    { label: "Expedición", value: "11" },
    { label: "Producción", value: "12" },
    { label: "Rallado de pan", value: "13" },
    { label: "Enfriador aéreo", value: "14" },
    { label: "Envasado prod. fiestas", value: "15" },
  ];

  const densidadVoladores = [
    { label: "Baja", value: "baja" },
    { label: "Media", value: "media" },
    { label: "Alta", value: "alta" },
  ];

  const reposicionVoladores = [
    { label: "No", value: "no" },
    { label: "Sí", value: "si" },
  ];

  //Estados para manejar los voladores
  // const [showVoladores, setShowVoladores] = useState(false); // Estado para mostrar u ocultar los voladores
  const [selectedUbicacionVoladores, setSelectedUbicacionVoladores] =
    useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedUbicacionLabel, setSelectedUbicacionLabel] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedDensidadVoladores, setSelectedDensidadVoladores] =
    useState("");
  const [selectedReposicionVoladores, setSelectedReposicionVoladores] =
    useState("");
  const [selectedObservacionesVoladores, setSelectedObservacionesVoladores] =
    useState("");

  //Funciones para limpiar los campos
  const LimpiarVoladores = () => {
    setSelectedUbicacionVoladores("");
    setSelectedUbicacionLabel("");
    setSelectedDensidadVoladores("");
    setSelectedReposicionVoladores("");
    setSelectedObservacionesVoladores("");
  };

  return (
    <ScrollView>
      <View style={styles.voladoresContainer}>
        <Dropdown
          data={ubicacionVoladores}
          search
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedUbicacionVoladores} // Valor actualmente seleccionado
          placeholder="Ubicación:"
          onChange={(item) => {
            setSelectedUbicacionVoladores(item.value); // Cambiar el valor seleccionado
            setSelectedUbicacionLabel(item.label); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={densidadVoladores}
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedDensidadVoladores} // Valor actualmente seleccionado
          placeholder="Densidad:"
          onChange={(item) => {
            setSelectedDensidadVoladores(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={reposicionVoladores}
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedReposicionVoladores} // Valor actualmente seleccionado
          placeholder="Reposición:"
          onChange={(item) => {
            setSelectedReposicionVoladores(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <TextInput
          style={styles.input}
          placeholder="Observaciones"
          value={selectedObservacionesVoladores}
          onChangeText={(text) => setSelectedObservacionesVoladores(text)}
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
                !selectedUbicacionVoladores ||
                !selectedDensidadVoladores ||
                !selectedReposicionVoladores
              ) {
                alert("Por favor, complete todos los campos");
                return;
              } else {
                const selectedUbicacionLabel =
                  ubicacionVoladores.find(
                    (item) => item.value === selectedUbicacionVoladores,
                  )?.label || "";
                const newEntry = {
                  UV: parseInt(selectedUbicacionVoladores, 10), // Convierte el valor a entero
                  Ubicación: selectedUbicacionLabel,
                  Densidad: selectedDensidadVoladores,
                  Reposición: selectedReposicionVoladores,
                  Observaciones: selectedObservacionesVoladores,
                };
                setVoladoresData((prevData) => {
                  // Actualiza el estado de los datos
                  const updatedData = [...prevData, newEntry]; // Agrega la nueva entrada
                  updatedData.sort((a, b) => a.UV - b.UV); // Ordenar por "UV" de forma ascendente
                  return updatedData; // Devuelve los datos actualizados
                });

                //Resetea los campos
                LimpiarVoladores();
              }
              alert("Datos guardados correctamente");
            }}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => {
              if (voladoresData.length > 0) {
                // Eliminar el último registro de los datos
                setVoladoresData((prev) => prev.slice(0, -1));
                alert("Último registro eliminado");
              } else {
                alert("No hay registros para eliminar");
              }
              LimpiarVoladores();
            }}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        {voladoresData.length > 0 && (
          <View style={styles.spreadsheet}>
            <View style={[styles.containerData, styles.headerData]}>
              <Text style={[styles.titledatoscajas, styles.column]}>UV N°</Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Ubicación
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Densidad
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Reposición
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Observaciones
              </Text>
            </View>
            {voladoresData.map((entry, index) => (
              <View style={styles.containerData} key={index}>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.UV}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.Ubicación}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.Densidad}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.Reposición}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.Observaciones}
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
  voladoresContainer: {
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
