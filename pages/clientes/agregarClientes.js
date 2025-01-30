import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { supabase } from "../../utils/database/supabaseClient";

export default function AgregarClientes() {
  const [clienteNombre, setClienteNombre] = useState("");
  const [plantaNombre, setPlantaNombre] = useState("");
  const [loading, setLoading] = useState(false);

  // Función para guardar un nuevo cliente y su planta
  async function saveCliente() {
    if (!clienteNombre.trim() || !plantaNombre.trim()) {
      Alert.alert("Error", "Debes ingresar el nombre del cliente y de la planta.");
      return;
    }

    setLoading(true);

    try {
      const { data: existingCliente, error: fetchError } = await supabase
        .from("clientes")
        .select("id")
        .eq("nombre", clienteNombre)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (existingCliente) {
        Alert.alert("Error", "El cliente ya existe en la base de datos.");
        setLoading(false);
        setClienteNombre("");
        setPlantaNombre("");
        return;
      }

      const { data: clienteData, error: clienteError } = await supabase
        .from("clientes")
        .insert([{ nombre: clienteNombre }])
        .select()
        .single();

      if (clienteError) throw clienteError;

      const clienteId = clienteData.id;

      const { error: plantaError } = await supabase
        .from("plantas")
        .insert([{ nombre: plantaNombre, cliente_id: clienteId }]);

      if (plantaError) throw plantaError;

      Alert.alert("Éxito", "Cliente y planta guardados correctamente.");
      setClienteNombre("");
      setPlantaNombre("");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el cliente y la planta: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nuevo Cliente</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={clienteNombre}
            onChangeText={setClienteNombre}
            placeholder="Nombre:"
          />
          <TextInput
            style={styles.input}
            value={plantaNombre}
            onChangeText={setPlantaNombre}
            placeholder="Planta/Sucursal:"
          />
          <TouchableOpacity
            style={[styles.boton, loading && styles.botonDisabled]}
            onPress={saveCliente}
            disabled={loading}
          >
            <Text style={styles.textoBoton}>
              {loading ? "Guardando..." : "Guardar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  botonDisabled: {
    backgroundColor: "#A9A9A9",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
});


