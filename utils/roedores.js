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

export default function Roedores({ onClose, roedoresData, setRoedoresData }) {
  const roedoresVivos = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];

  const roedoresMuertos = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];

  const materiaFecal = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];

  const tipoTrampa = [
    { label: "A", value: "a" },
    { label: "B", value: "b" },
  ];

  const consumoCebos = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];

  const reposicionRoedores = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];

  const [cajaRoedores, setCajaRoedores] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedRoedoresVivos, setSelectedRoedoresVivos] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedRoedoresMuertos, setSelectedRoedoresMuertos] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedTipoTrampa, setSelectedTipoTrampa] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedMateriaFecal, setSelectedMateriaFecal] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedConsumoCebos, setSelectedConsumoCebos] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedReposicionRoedores, setSelectedReposicionRoedores] =
    useState(""); // Estado para manejar la selección en el Dropdown

  const LimpiarRoedores = () => {
    // Función para limpiar los campos de los roedores
    setCajaRoedores("");
    setSelectedRoedoresVivos("");
    setSelectedRoedoresMuertos("");
    setSelectedTipoTrampa("");
    setSelectedMateriaFecal("");
    setSelectedConsumoCebos("");
    setSelectedReposicionRoedores("");
  };

  return (
    <ScrollView>
      <View style={styles.roedoresContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setCajaRoedores(value)}
          value={cajaRoedores}
          placeholder="Caja N°:"
        />
        <Dropdown
          data={roedoresVivos}
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedRoedoresVivos} // Valor actualmente seleccionado
          placeholder="Roedores Vivos:"
          onChange={(item) => {
            setSelectedRoedoresVivos(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={roedoresMuertos}
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedRoedoresMuertos} // Valor actualmente seleccionado
          placeholder="Roedores Muertos:"
          onChange={(item) => {
            setSelectedRoedoresMuertos(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={tipoTrampa}
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedTipoTrampa} // Valor actualmente seleccionado
          placeholder="Trampa PEGA/TRAMPA: A/B"
          onChange={(item) => {
            setSelectedTipoTrampa(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={materiaFecal}
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedMateriaFecal} // Valor actualmente seleccionado
          placeholder="Materia fecal:"
          onChange={(item) => {
            setSelectedMateriaFecal(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={consumoCebos}
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedConsumoCebos} // Valor actualmente seleccionado
          placeholder="Consumo cebos:"
          onChange={(item) => {
            setSelectedConsumoCebos(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={reposicionRoedores}
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedReposicionRoedores} // Valor actualmente seleccionado
          placeholder="Reposición:"
          onChange={(item) => {
            setSelectedReposicionRoedores(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
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
                !cajaRoedores ||
                !selectedRoedoresVivos ||
                !selectedRoedoresMuertos ||
                !selectedTipoTrampa ||
                !selectedMateriaFecal ||
                !selectedConsumoCebos ||
                !selectedReposicionRoedores
              ) {
                alert("Por favor, complete todos los campos");
                return;
              } else {
                const newEntry = {
                  caja: cajaRoedores,
                  vivos: selectedRoedoresVivos,
                  muertos: selectedRoedoresMuertos,
                  tipoTrampa: selectedTipoTrampa,
                  materiaFecal: selectedMateriaFecal,
                  consumoCebos: selectedConsumoCebos,
                  reposicion: selectedReposicionRoedores,
                };
                setRoedoresData((prev) => [...prev, newEntry]); // Agrega el nuevo registro
                // Resetea los campos
                LimpiarRoedores();
              }
              alert("Datos guardados con exito");
            }}
          >
            <Text>Agregar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              onClose(); // Cerrar el componente
              LimpiarRoedores();
            }}
          >
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
        {roedoresData.length > 0 && (
          <View style={styles.spreadsheet}>
            <View style={[styles.containerData, styles.headerData]}>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Caja N°
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>Vivos</Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Muertos
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Tipo trampa
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Consumo
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Reposición
              </Text>
            </View>
            {roedoresData.map((entry, index) => (
              <View style={styles.containerData} key={index}>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.caja}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.vivos}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.muertos}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.tipoTrampa}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.consumoCebos}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.reposicion}
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
  textTouchable: {
    fontSize: 16,
    fontWeight: "bold",
  },
  roedoresContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 20,
    paddingVertical: 16,
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
