import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { supabase } from "../../utils/database/supabaseClient";

export default function AgregarProductos() {
  const [productoNombre, setProductoNombre] = useState("");
  const [productoTipo, setProductoTipo] = useState("");
  const [productoPrincipioActivo, setProductoPrincipioActivo] = useState("");
  const [productoLaboratorio, setProductoLaboratorio] = useState("");
  const [productoCertificado, setProductoCertificado] = useState("");

  const tiposProducto = [
    { label: "ROEDORES", value: "ROEDORES" },
    { label: "INSECTICIDA", value: "INSECTICIDA" },
  ];

  const agregarProducto = async () => {
    if (!productoNombre || !productoTipo || !productoPrincipioActivo || !productoLaboratorio) {
      Alert.alert("Error", "Los campos Nombre, Tipo, Principio Activo y Laboratorio son obligatorios");
      return;
    }

    const { error } = await supabase.from("productos").insert([
      {
        nombre: productoNombre,
        tipo: productoTipo,
        principio_activo: productoPrincipioActivo,
        laboratorio: productoLaboratorio,
        certificado: productoCertificado || null,
      },
    ]);

    if (error) {
      Alert.alert("Error", "No se pudo agregar el producto");
      console.error(error);
    } else {
      Alert.alert("Éxito", "Producto agregado correctamente");
      setProductoNombre("");
      setProductoTipo("");
      setProductoPrincipioActivo("");
      setProductoLaboratorio("");
      setProductoCertificado("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Agregar Producto</Text>
          <ScrollView style={styles.form}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={productoNombre}
              onChangeText={setProductoNombre}
            />

            <Text style={styles.label}>Tipo:</Text>
            <Dropdown
              style={styles.dropdown}
              data={tiposProducto}
              labelField="label"
              valueField="value"
              placeholder="Seleccione un tipo"
              value={productoTipo}
              onChange={(item) => setProductoTipo(item.value)}
            />

            <Text style={styles.label}>Principio Activo:</Text>
            <TextInput
              style={styles.input}
              value={productoPrincipioActivo}
              onChangeText={setProductoPrincipioActivo}
            />

            <Text style={styles.label}>Laboratorio:</Text>
            <TextInput
              style={styles.input}
              value={productoLaboratorio}
              onChangeText={setProductoLaboratorio}
            />

            <Text style={styles.label}>Certificado:</Text>
            <TextInput
              style={styles.input}
              value={productoCertificado}
              onChangeText={setProductoCertificado}
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={agregarProducto}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  form: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

