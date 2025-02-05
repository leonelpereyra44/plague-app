import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import globalStyles from "../../utils/styles/globalStyles";

export default function Voladores({
  onClose,
  voladoresData,
  setVoladoresData,
}) {
  const densidad = [
    { label: "Baja", value: "baja" },
    { label: "Media", value: "media" },
    { label: "Alta", value: "alta" },
  ];

  const reposicion = [
    { label: "No", value: "no" },
    { label: "Sí", value: "si" },
  ];

  // Estados para manejar los voladores
  const [selectedCajaUv, setSelectedCajaUv] = useState("");
  const [selectedDensidad, setSelectedDensidad] = useState("");
  const [selectedReposicion, setSelectedReposicion] = useState("");
  const [selectedObservacionesVoladores, setSelectedObservacionesVoladores] =
    useState("");

  // Funciones para limpiar los campos
  const LimpiarVoladores = () => {
    setSelectedCajaUv("");
    setSelectedDensidad("");
    setSelectedReposicion("");
    setSelectedObservacionesVoladores("");
  };

  const handleAdd = () => {
    if (!selectedCajaUv || !selectedDensidad || !selectedReposicion) {
      alert("Por favor, complete todos los campos");
      return;
    }

    const newEntry = {
      UV: selectedCajaUv,
      Densidad: selectedDensidad,
      Reposición: selectedReposicion,
      Observaciones: selectedObservacionesVoladores,
    };

    setVoladoresData((prevData) => {
      const updatedData = [...prevData, newEntry];
      updatedData.sort((a, b) => a.UV - b.UV);
      return updatedData;
    });

    LimpiarVoladores();
    alert("Datos guardados correctamente");
  };

  const handleDelete = () => {
    if (voladoresData.length > 0) {
      setVoladoresData((prev) => prev.slice(0, -1));
      alert("Último registro eliminado");
    } else {
      alert("No hay registros para eliminar");
    }

    LimpiarVoladores();
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      {/* Tarjeta de ingreso de datos */}
      <View style={globalStyles.form}>
        <Text style={globalStyles.title}>Voladores</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Caja UV N°:"
          value={selectedCajaUv}
          onChangeText={(text) => setSelectedCajaUv(text)}
        />
        <Dropdown
          data={densidad}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedDensidad}
          placeholder="Densidad:"
          onChange={(item) => {
            setSelectedDensidad(item.value);
          }}
          style={globalStyles.dropdown}
        />
        <Dropdown
          data={reposicion}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedReposicion}
          placeholder="Reposición:"
          onChange={(item) => {
            setSelectedReposicion(item.value);
          }}
          style={globalStyles.dropdown}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Observaciones"
          value={selectedObservacionesVoladores}
          onChangeText={(text) => setSelectedObservacionesVoladores(text)}
        />
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity style={globalStyles.saveButton} onPress={handleAdd}>
            <Text style={globalStyles.buttonText}>Añadir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={globalStyles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tarjeta para visualizar los datos */}
      {voladoresData.length > 0 && (
        <View style={globalStyles.spreadsheet}>
          <View style={globalStyles.headerData}>
            <Text style={globalStyles.headerText}>UV N°</Text>
            <Text style={globalStyles.headerText}>Densidad</Text>
            <Text style={globalStyles.headerText}>Reposición</Text>
            <Text style={globalStyles.headerText}>Observaciones</Text>
          </View>
          {voladoresData.map((entry, index) => (
            <View style={globalStyles.containerData} key={index}>
              <Text style={globalStyles.column}>{entry.UV}</Text>
              <Text style={globalStyles.column}>{entry.Densidad}</Text>
              <Text style={globalStyles.column}>{entry.Reposición}</Text>
              <Text style={globalStyles.column}>{entry.Observaciones}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
