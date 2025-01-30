import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { supabase } from "../../utils/database/supabaseClient";

export default function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProducto, setEditingProducto] = useState(null);
  const [productoNombre, setProductoNombre] = useState("");
  const [productoTipo, setProductoTipo] = useState("");
  const [productoPrincipioActivo, setProductoPrincipioActivo] = useState("");
  const [productoLaboratorio, setProductoLaboratorio] = useState("");
  const [productoCertificado, setProductoCertificado] = useState("");

  const tipoOptions = [
    { label: "ROEDORES", value: "ROEDORES" },
    { label: "INSECTICIDA", value: "INSECTICIDA" },
  ];

  useEffect(() => {
    fetchProductos();
  }, []);

  async function fetchProductos() {
    setLoading(true);
    const { data, error } = await supabase
      .from("productos")
      .select("id, nombre, tipo, principio_activo, laboratorio, certificado");

    if (error) {
      Alert.alert(
        "Error",
        "No se pudieron cargar los productos: " + error.message,
      );
    } else {
      setProductos(data || []);
    }
    setLoading(false);
  }

  function handleEditarProducto(producto) {
    setEditingProducto(producto);
    setProductoNombre(producto.nombre);
    setProductoTipo(producto.tipo);
    setProductoPrincipioActivo(producto.principio_activo);
    setProductoLaboratorio(producto.laboratorio);
    setProductoCertificado(producto.certificado);
  }

  async function guardarEdicion() {
    if (!editingProducto) return;

    const { error } = await supabase
      .from("productos")
      .update({
        nombre: productoNombre,
        tipo: productoTipo,
        principio_activo: productoPrincipioActivo,
        laboratorio: productoLaboratorio,
        certificado: productoCertificado,
      })
      .eq("id", editingProducto.id);

    if (error) {
      Alert.alert(
        "Error",
        "No se pudo actualizar el producto: " + error.message,
      );
    } else {
      Alert.alert("Éxito", "Producto actualizado correctamente.");
      setEditingProducto(null);
      fetchProductos();
    }
  }

  function confirmarEliminarProducto(id, nombre) {
    Alert.alert(
      "CUIDADO!!!",
      `Está por eliminar el producto: ${nombre}. ¿Está seguro?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => eliminarProducto(id) },
      ],
    );
  }

  async function eliminarProducto(id) {
    const { error } = await supabase.from("productos").delete().eq("id", id);
    if (error) {
      Alert.alert("Error", "No se pudo eliminar el producto: " + error.message);
    } else {
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== id),
      );
      Alert.alert("Éxito", "Producto eliminado correctamente.");
    }
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Lista de Productos</Text>
          {editingProducto ? (
            <View style={styles.formContainer}>
              <ScrollView>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                  style={styles.input}
                  value={productoNombre}
                  onChangeText={setProductoNombre}
                />

                <Text style={styles.label}>Tipo:</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={tipoOptions}
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
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={guardarEdicion}
                >
                  <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditingProducto(null)}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : productos.length === 0 ? (
            <Text style={styles.noData}>No hay productos disponibles</Text>
          ) : (
            <FlatList
              data={productos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.nombre}>{item.nombre}</Text>
                  <Text>Tipo: {item.tipo}</Text>
                  <Text>Principio Activo: {item.principio_activo}</Text>
                  <Text>Laboratorio: {item.laboratorio}</Text>
                  <Text>Certificado: {item.certificado}</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditarProducto(item)}
                    >
                      <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() =>
                        confirmarEliminarProducto(item.id, item.nombre)
                      }
                    >
                      <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
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
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: "#f0ad4e",
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "#95a5a6",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
    marginTop: 5,
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});
