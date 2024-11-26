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

  // const [voladoresData, setVoladoresData] = useState([]); // Estado para manejar los datos de los voladores

  //Funciones para limpiar los campos
  const LimpiarVoladores = () => {
    // Función para limpiar los campos de los voladores
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
            style={styles.touchable}
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
                  uv: selectedUbicacionVoladores,
                  ubicacion: selectedUbicacionLabel,
                  densidad: selectedDensidadVoladores,
                  reposicion: selectedReposicionVoladores,
                  observaciones: selectedObservacionesVoladores,
                };
                setVoladoresData((prev) => [...prev, newEntry]); // Agrega el nuevo registro

                //Resetea los campos
                LimpiarVoladores();
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
              LimpiarVoladores();
            }}
          >
            <Text>Cerrar</Text>
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
                  {entry.uv}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.ubicacion}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.densidad}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.reposicion}
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
  voladoresContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 20, // Ajusta el espacio para evitar solapamientos
    paddingVertical: 16,
    backgroundColor: "#fff", // Fondo visible
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
    borderBottomColor: "black", // Línea más gruesa para encabezados
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
