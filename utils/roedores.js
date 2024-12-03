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
    { label: "Pega", value: "Pega" },
    { label: "Trampa", value: "Trampa" },
    { label: "Cebo", value: "Cebo" },
    { label: "Otra", value: "Otra" },
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
          placeholder="Trampa:"
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
            style={styles.button}
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
              }

              // Crear una nueva entrada
              const newEntry = {
                Caja: parseInt(cajaRoedores, 10), // Convertir a número para ordenar correctamente
                Vivos: selectedRoedoresVivos,
                Muertos: selectedRoedoresMuertos,
                TipoTrampa: selectedTipoTrampa,
                MateriaFecal: selectedMateriaFecal,
                ConsumoCebos: selectedConsumoCebos,
                Reposición: selectedReposicionRoedores,
              };

              // Actualizar y ordenar los datos
              setRoedoresData((prevData) => {
                const updatedData = [...prevData, newEntry];
                updatedData.sort((a, b) => a.Caja - b.Caja); // Ordenar por "caja" de forma ascendente
                return updatedData;
              });

              // Limpiar los campos del formulario
              LimpiarRoedores();
              alert("Datos guardados con éxito");
            }}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => {
              if (roedoresData.length > 0) {
                // Eliminar el último registro de los datos
                setRoedoresData((prev) => prev.slice(0, -1));
                alert("Último registro eliminado");
              } else {
                alert("No hay registros para eliminar");
              }
              LimpiarRoedores();
            }}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
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
                  {entry.Caja}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.Vivos}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.Muertos}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.TipoTrampa}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.ConsumoCebos}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.Reposición}
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
  roedoresContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
    paddingVertical: 16,
    backgroundColor: "#F5F5F5", // Fondo gris claro
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  containerAgregar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra para Android
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: "#333",
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
    borderColor: "#ddd",
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
    fontSize: 10,
    textAlign: "center",
    color: "#FFF",
  },
  datosEmpresa: {
    fontSize: 10,
    textAlign: "center",
    color: "#333",
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
});
