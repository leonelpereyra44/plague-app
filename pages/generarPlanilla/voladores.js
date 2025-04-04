import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
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
    { label: "N.A", value: "N.A" },
    { label: "R.P", value: "R.P" },
  ];

  const reposicion = [
    { label: "No", value: "no" },
    { label: "Sí", value: "si" },
    { label: "N.A", value: "N.A" },
    { label: "R.P", value: "R.P" },
  ];

  const [selectedCajaUv, setSelectedCajaUv] = useState("");
  const [selectedDensidad, setSelectedDensidad] = useState("");
  const [selectedReposicion, setSelectedReposicion] = useState("");
  const [selectedObservacionesVoladores, setSelectedObservacionesVoladores] =
    useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteCajaUv, setDeleteCajaUv] = useState("");

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
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (!deleteCajaUv) {
      alert("Ingrese un número de caja UV para eliminar");
      return;
    }

    const filteredData = voladoresData.filter(
      (item) => item.UV !== deleteCajaUv,
    );

    if (filteredData.length === voladoresData.length) {
      alert("No se encontró la caja UV ingresada");
    } else {
      setVoladoresData(filteredData);
      alert(`Caja UV ${deleteCajaUv} eliminada correctamente`);
    }

    setDeleteCajaUv("");
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View style={globalStyles.form}>
        <Text style={globalStyles.title}>Voladores</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Caja UV N°:"
          value={selectedCajaUv}
          keyboardType="numeric"
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, ""); // Solo números
            setSelectedCajaUv(numericText);
          }}
        />
        <Dropdown
          data={densidad}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedDensidad}
          placeholder="Densidad:"
          onChange={(item) => setSelectedDensidad(item.value)}
          style={globalStyles.dropdown}
        />
        <Dropdown
          data={reposicion}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedReposicion}
          placeholder="Reposición:"
          onChange={(item) => setSelectedReposicion(item.value)}
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

      {/* Modal para eliminar por número de caja */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalTitle}>Eliminar Caja UV</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Ingrese N° de Caja UV"
              value={deleteCajaUv}
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                setDeleteCajaUv(numericText);
              }}
            />
            <View style={globalStyles.modalButtons}>
              <TouchableOpacity
                style={globalStyles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={globalStyles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyles.deleteButton}
                onPress={confirmDelete}
              >
                <Text style={globalStyles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
});
