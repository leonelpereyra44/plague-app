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

  const [cajaRoedores, setCajaRoedores] = useState("");
  const [selectedRoedoresVivos, setSelectedRoedoresVivos] = useState("");
  const [selectedRoedoresMuertos, setSelectedRoedoresMuertos] = useState("");
  const [selectedTipoTrampa, setSelectedTipoTrampa] = useState("");
  const [selectedMateriaFecal, setSelectedMateriaFecal] = useState("");
  const [selectedConsumoCebos, setSelectedConsumoCebos] = useState("");
  const [selectedReposicionRoedores, setSelectedReposicionRoedores] =
    useState("");
  const [observaciones, setObservaciones] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [cajaEliminar, setCajaEliminar] = useState("");

  const LimpiarRoedores = () => {
    setCajaRoedores("");
    setSelectedRoedoresVivos("");
    setSelectedRoedoresMuertos("");
    setSelectedTipoTrampa("");
    setSelectedMateriaFecal("");
    setSelectedConsumoCebos("");
    setSelectedReposicionRoedores("");
    setObservaciones("");
  };

  const [error, setError] = useState("");

  const handleCajaChange = (value) => {
    if (/^\d*$/.test(value)) {
      setCajaRoedores(value);
      setError("");
    } else {
      setError("El valor debe ser un número");
    }
  };

  const handleGuardar = () => {
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

    const newEntry = {
      Caja: parseInt(cajaRoedores, 10),
      Vivos: selectedRoedoresVivos,
      Muertos: selectedRoedoresMuertos,
      TipoTrampa: selectedTipoTrampa,
      MateriaFecal: selectedMateriaFecal,
      ConsumoCebos: selectedConsumoCebos,
      Reposición: selectedReposicionRoedores,
      Observaciones: observaciones,
    };

    setRoedoresData((prevData) => {
      const updatedData = [...prevData, newEntry];
      updatedData.sort((a, b) => a.Caja - b.Caja);
      return updatedData;
    });

    LimpiarRoedores();
    alert("Datos guardados con éxito");
  };

  const handleDelete = () => {
    setModalVisible(true);
  };

  const confirmDelete = () => {
    const numeroCaja = parseInt(cajaEliminar, 10);

    if (isNaN(numeroCaja)) {
      alert("Debe ingresar un número válido.");
      return;
    }

    setRoedoresData((prevData) => {
      const updatedData = prevData.filter((entry) => entry.Caja !== numeroCaja);

      if (updatedData.length === prevData.length) {
        alert(`No se encontró la caja N° ${numeroCaja}`);
        return prevData;
      }

      alert(`Caja N° ${numeroCaja} eliminada correctamente`);
      return updatedData;
    });

    setCajaEliminar("");
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalTitle}>
              Ingrese el número de caja a eliminar
            </Text>
            <TextInput
              style={globalStyles.input}
              keyboardType="numeric"
              value={cajaEliminar}
              onChangeText={setCajaEliminar}
              placeholder="Caja N°"
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

      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={globalStyles.form}>
          <Text style={globalStyles.title}>Roedores</Text>

          <TextInput
            style={globalStyles.input}
            onChangeText={handleCajaChange}
            value={cajaRoedores}
            placeholder="Caja N°"
          />

          <Dropdown
            data={roedoresVivos}
            labelField="label"
            valueField="value"
            placeholder="Vivos *"
            value={selectedRoedoresVivos}
            onChange={(item) => setSelectedRoedoresVivos(item.value)}
            style={globalStyles.dropdown}
          />

          <Dropdown
            data={roedoresMuertos}
            labelField="label"
            valueField="value"
            placeholder="Muertos *"
            value={selectedRoedoresMuertos}
            onChange={(item) => setSelectedRoedoresMuertos(item.value)}
            style={globalStyles.dropdown}
          />

          <Dropdown
            data={tipoTrampa}
            labelField="label"
            valueField="value"
            placeholder="Tipo de Trampa *"
            value={selectedTipoTrampa}
            onChange={(item) => setSelectedTipoTrampa(item.value)}
            style={globalStyles.dropdown}
          />

          <Dropdown
            data={materiaFecal}
            labelField="label"
            valueField="value"
            placeholder="Materia Fecal *"
            value={selectedMateriaFecal}
            onChange={(item) => setSelectedMateriaFecal(item.value)}
            style={globalStyles.dropdown}
          />

          <Dropdown
            data={consumoCebos}
            labelField="label"
            valueField="value"
            placeholder="Consumo *"
            value={selectedConsumoCebos}
            onChange={(item) => setSelectedConsumoCebos(item.value)}
            style={globalStyles.dropdown}
          />

          <Dropdown
            data={reposicionRoedores}
            labelField="label"
            valueField="value"
            placeholder="Reposición *"
            value={selectedReposicionRoedores}
            onChange={(item) => setSelectedReposicionRoedores(item.value)}
            style={globalStyles.dropdown}
          />

          <TextInput
            style={globalStyles.input}
            onChangeText={(value) => setObservaciones(value)}
            value={observaciones}
            placeholder="Observaciones"
            multiline
          />

          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              style={globalStyles.saveButton}
              onPress={handleGuardar}
            >
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

        {roedoresData.length > 0 && (
          <View style={globalStyles.spreadsheet}>
            <View style={globalStyles.headerData}>
              <Text style={globalStyles.headerText}>Caja N°</Text>
              <Text style={globalStyles.headerText}>Vivos</Text>
              <Text style={globalStyles.headerText}>Muertos</Text>
              <Text style={globalStyles.headerText}>Tipo Trampa</Text>
              <Text style={globalStyles.headerText}>Consumo</Text>
              <Text style={globalStyles.headerText}>Reposición</Text>
              <Text style={globalStyles.headerText}>Observaciones</Text>
            </View>
            {roedoresData.map((entry, index) => (
              <View style={globalStyles.containerData} key={index}>
                <Text style={globalStyles.column}>{entry.Caja}</Text>
                <Text style={globalStyles.column}>{entry.Vivos}</Text>
                <Text style={globalStyles.column}>{entry.Muertos}</Text>
                <Text style={globalStyles.column}>{entry.TipoTrampa}</Text>
                <Text style={globalStyles.column}>{entry.ConsumoCebos}</Text>
                <Text style={globalStyles.column}>{entry.Reposición}</Text>
                <Text style={globalStyles.column}>{entry.Observaciones}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
