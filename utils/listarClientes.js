import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "./database/supabaseClient";

export default function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCliente, setEditingCliente] = useState(null);
  const [clienteNombre, setClienteNombre] = useState("");
  const [plantas, setPlantas] = useState([]);
  const [nuevaPlanta, setNuevaPlanta] = useState("");

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    setLoading(true);
    const { data, error } = await supabase
      .from("clientes")
      .select(`id, nombre, plantas(id, nombre)`);

    if (error) {
      Alert.alert(
        "Error",
        "No se pudieron cargar los clientes: " + error.message,
      );
    } else {
      setClientes(data || []);
    }
    setLoading(false);
  }

  function handleEditarCliente(cliente) {
    setEditingCliente(cliente);
    setClienteNombre(cliente.nombre);
    setPlantas(cliente.plantas || []);
  }

  async function handleGuardarCambios() {
    if (!clienteNombre.trim()) {
      Alert.alert("Error", "El nombre del cliente no puede estar vacío");
      return;
    }

    setLoading(true);
    try {
      const { error: clienteError } = await supabase
        .from("clientes")
        .update({ nombre: clienteNombre })
        .eq("id", editingCliente.id);

      if (clienteError) throw clienteError;

      for (const planta of plantas) {
        if (!planta.id) {
          const { error: insertError } = await supabase
            .from("plantas")
            .insert([{ nombre: planta.nombre, cliente_id: editingCliente.id }]);

          if (insertError) throw insertError;
        } else if (planta.modified) {
          const { error: updateError } = await supabase
            .from("plantas")
            .update({ nombre: planta.nombre })
            .eq("id", planta.id);

          if (updateError) throw updateError;
        }
      }

      Alert.alert("Éxito", "Los cambios han sido guardados");
      setEditingCliente(null);
      setClienteNombre("");
      setPlantas([]);
      setNuevaPlanta(""); // Limpiar el input de nueva planta
      fetchClientes();
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudieron guardar los cambios: " + error.message,
      );
    } finally {
      setLoading(false);
    }
  }

  function handleModificarPlanta(index, nuevoNombre) {
    const updatedPlantas = [...plantas];
    updatedPlantas[index] = {
      ...updatedPlantas[index],
      nombre: nuevoNombre,
      modified: true,
    };
    setPlantas(updatedPlantas);
  }

  function handleAgregarPlanta() {
    if (!nuevaPlanta.trim()) {
      Alert.alert("Error", "El nombre de la planta no puede estar vacío");
      return;
    }

    if (plantas.some((planta) => planta.nombre === nuevaPlanta)) {
      Alert.alert("Error", "Ya existe una planta con ese nombre");
      return;
    }

    setPlantas([...plantas, { nombre: nuevaPlanta }]);
    setNuevaPlanta("");
  }

  async function handleEliminarPlanta(index) {
    const plantaAEliminar = plantas[index];
    if (plantas.length === 1) {
      Alert.alert(
        "Error",
        "No se puede eliminar la única planta asociada al cliente.",
      );
      return;
    }

    if (plantaAEliminar.id) {
      const { error } = await supabase
        .from("plantas")
        .delete()
        .eq("id", plantaAEliminar.id);

      if (error) {
        Alert.alert("Error", "No se pudo eliminar la planta: " + error.message);
        return;
      }
    }

    const updatedPlantas = plantas.filter((_, i) => i !== index);
    setPlantas(updatedPlantas);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {editingCliente && (
        <View style={styles.editCard}>
          <Text style={styles.title}>Editar Cliente</Text>
          <TextInput
            style={styles.input}
            value={clienteNombre}
            onChangeText={setClienteNombre}
            placeholder="Nombre del cliente"
          />

          <FlatList
            style={styles.plantList}
            data={plantas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  value={item.nombre}
                  onChangeText={(text) => handleModificarPlanta(index, text)}
                  placeholder="Nombre de la planta"
                />
                <TouchableOpacity
                  onPress={() => handleEliminarPlanta(index)}
                  style={styles.deleteButton}
                >
                  <Text>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <TextInput
            style={styles.input}
            value={nuevaPlanta}
            onChangeText={setNuevaPlanta}
            placeholder="Agregar nueva planta"
          />
          <TouchableOpacity
            onPress={handleAgregarPlanta}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Agregar Planta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGuardarCambios}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.nombre}</Text>
            <FlatList
              data={item.plantas}
              keyExtractor={(planta) => planta.id.toString()}
              renderItem={({ item: planta }) => (
                <Text style={styles.plantName}>- {planta.nombre}</Text>
              )}
            />
            <TouchableOpacity
              onPress={() => handleEditarCliente(item)}
              style={styles.editButton}
            >
              <Text>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  plantName: {
    fontSize: 16,
    marginLeft: 10,
    color: "#555",
  },
  editCard: {
    padding: 15,
    backgroundColor: "#e9f7fe",
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: "#5cb85c",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#0275d8",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#f0ad4e",
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0", // Fondo gris claro
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10, // Espaciado superior
    borderWidth: 1, // Borde opcional
    borderColor: "#ccc", // Color del borde
  },

  cancelButtonText: {
    color: "#333", // Texto de color oscuro
    fontWeight: "bold",
  },
});
