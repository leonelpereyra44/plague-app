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
import { useData } from "../../utils/DataContext";

export default function Roedores({ onClose, roedoresData, setRoedoresData }) {
  const { setContadores } = useData();

  const opcionesGenericas = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
    { label: "N.A", value: "N.A" },
    { label: "R.P", value: "R.P" },
  ];

  const tipoTrampa = [
    { label: "Pega", value: "Pega" },
    { label: "Trampa", value: "Trampa" },
    { label: "Cebo", value: "Cebo" },
    { label: "Otra", value: "Otra" },
    { label: "N.A", value: "N.A" },
    { label: "R.P", value: "R.P" },
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
  const [error, setError] = useState("");
  const [modalPreviewVisible, setModalPreviewVisible] = useState(false);

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
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    const numeroCaja = parseInt(cajaRoedores, 10);

    // Validación de caja duplicada
    const cajaYaExiste = roedoresData.some((item) => item.Caja === numeroCaja);
    if (cajaYaExiste) {
      alert(`La caja N° ${numeroCaja} ya fue ingresada`);
      return;
    }

    const newEntry = {
      Caja: numeroCaja,
      Vivos: selectedRoedoresVivos,
      Muertos: selectedRoedoresMuertos,
      TipoTrampa: selectedTipoTrampa,
      MateriaFecal: selectedMateriaFecal,
      ConsumoCebos: selectedConsumoCebos,
      Reposición: selectedReposicionRoedores,
      Observaciones: observaciones,
    };

    setRoedoresData((prevData) => {
      const updatedData = [...prevData, newEntry].sort(
        (a, b) => a.Caja - b.Caja,
      );

      const { vivos, muertos, consumo } = contarTotalesFromArray(updatedData);

      // 👉 Actualizamos los contadores en el contexto
      setContadores({ vivos, muertos, consumo });

      console.log(
        "Datos guardados:",
        "Vivos:",
        vivos,
        "Muertos:",
        muertos,
        "Consumo:",
        consumo,
      );

      return updatedData;
    });

    LimpiarRoedores();
    alert("Datos guardados con éxito");
  };

  const contarTotalesFromArray = (data) => {
    let vivos = 0;
    let muertos = 0;
    let consumo = 0;

    data.forEach((item) => {
      if (item.Vivos === "si") vivos += 1;
      if (item.Muertos === "si") muertos += 1;
      if (item.ConsumoCebos === "si") consumo += 1;
    });

    return { vivos, muertos, consumo };
  };

  const handleDelete = () => setModalVisible(true);

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPreviewVisible}
        onRequestClose={() => setModalPreviewVisible(false)}
      >
        <View style={globalStyles.modalContainer}>
          <View style={[globalStyles.modalContent, { maxHeight: "80%" }]}>
            <Text style={globalStyles.modalTitle}>Control de Cajas</Text>
            <ScrollView style={{ marginBottom: 10 }}>
              {roedoresData.length === 0 ? (
                <Text>No hay datos cargados.</Text>
              ) : (
                roedoresData.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      marginBottom: 10,
                      borderBottomWidth: 1,
                      borderColor: "#ccc",
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={styles.cajaPreview}>Caja: {item.Caja}</Text>
                    <Text>Vivos: {item.Vivos}</Text>
                    <Text>Muertos: {item.Muertos}</Text>
                    <Text>Tipo de Trampa: {item.TipoTrampa}</Text>
                    <Text>Materia Fecal: {item.MateriaFecal}</Text>
                    <Text>Consumo: {item.ConsumoCebos}</Text>
                    <Text>Reposición: {item.Reposición}</Text>
                    <Text>Obs: {item.Observaciones}</Text>
                  </View>
                ))
              )}
            </ScrollView>
            <TouchableOpacity
              style={globalStyles.cancelButton}
              onPress={() => setModalPreviewVisible(false)}
            >
              <Text style={globalStyles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={globalStyles.form}>
          <Text style={globalStyles.title}>Roedores</Text>

          <TextInput
            style={globalStyles.input}
            keyboardType="numeric"
            onChangeText={handleCajaChange}
            value={cajaRoedores}
            placeholder="Caja N°"
          />

          <Dropdown
            data={opcionesGenericas}
            labelField="label"
            valueField="value"
            placeholder="Vivos *"
            value={selectedRoedoresVivos}
            onChange={(item) => setSelectedRoedoresVivos(item.value)}
            style={globalStyles.dropdown}
          />

          <Dropdown
            data={opcionesGenericas}
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
            data={opcionesGenericas}
            labelField="label"
            valueField="value"
            placeholder="Materia Fecal *"
            value={selectedMateriaFecal}
            onChange={(item) => setSelectedMateriaFecal(item.value)}
            style={globalStyles.dropdown}
          />

          <Dropdown
            data={opcionesGenericas}
            labelField="label"
            valueField="value"
            placeholder="Consumo *"
            value={selectedConsumoCebos}
            onChange={(item) => setSelectedConsumoCebos(item.value)}
            style={globalStyles.dropdown}
          />

          <Dropdown
            data={opcionesGenericas}
            labelField="label"
            valueField="value"
            placeholder="Reposición *"
            value={selectedReposicionRoedores}
            onChange={(item) => setSelectedReposicionRoedores(item.value)}
            style={globalStyles.dropdown}
          />

          <TextInput
            style={globalStyles.input}
            onChangeText={setObservaciones}
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
          <TouchableOpacity
            style={globalStyles.previewButton}
            onPress={() => setModalPreviewVisible(true)}
          >
            <Text style={globalStyles.buttonText}>Previsualizar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  cajaPreview: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
  },
});
