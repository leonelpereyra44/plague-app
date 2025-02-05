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
import globalStyles from "../../utils/styles/globalStyles";

export default function Rastreros({
  onClose,
  rastrerosData,
  setRastrerosData,
}) {
  const [selectedObservaciones, setSelectedObservaciones] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  // Funciones para limpiar los campos
  const Limpiar = () => {
    setSelectedObservaciones("");
    setUbicacion("");
  };

  const handleAdd = () => {
    if (!ubicacion) {
      alert("Por favor, complete todos los campos");
      return;
    }

    const newEntry = {
      Ubicación: ubicacion,
      Observaciones: selectedObservaciones,
    };

    setRastrerosData((prevData) => {
      const updatedData = [...prevData, newEntry];
      return updatedData;
    });

    Limpiar();
    alert("Datos guardados correctamente");
  };

  const handleDelete = () => {
    if (rastrerosData.length > 0) {
      setRastrerosData((prev) => prev.slice(0, -1));
      alert("Último registro eliminado");
    } else {
      alert("No hay registros para eliminar");
    }

    Limpiar();
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View style={globalStyles.form}>
        <Text style={globalStyles.title}>Rastreros</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Ubicación:"
          value={ubicacion}
          onChangeText={(text) => setUbicacion(text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Observaciones"
          value={selectedObservaciones}
          onChangeText={(text) => setSelectedObservaciones(text)}
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
      {rastrerosData.length > 0 && (
        <View style={globalStyles.spreadsheet}>
          <View style={globalStyles.headerData}>
            <Text style={globalStyles.headerText}>Ubicación</Text>

            <Text style={globalStyles.headerText}>Observaciones</Text>
          </View>
          {rastrerosData.map((entry, index) => (
            <View style={globalStyles.containerData} key={index}>
              <Text style={globalStyles.column}>{entry.Ubicación}</Text>
              <Text style={globalStyles.column}>{entry.Observaciones}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({});
