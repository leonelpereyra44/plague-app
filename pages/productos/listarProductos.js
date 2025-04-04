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
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { supabase } from "../../utils/database/supabaseClient";
import globalStyles from "../../utils/styles/globalStyles";

export default function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProducto, setEditingProducto] = useState(null);
  const [productoNombre, setProductoNombre] = useState("");
  const [productoTipo, setProductoTipo] = useState("");
  const [productoPrincipioActivo, setProductoPrincipioActivo] = useState("");
  const [productoLaboratorio, setProductoLaboratorio] = useState("");
  const [productoCertificado, setProductoCertificado] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(true);
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
      setModalVisible(false);
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
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.textoItem}>Tipo: {item.tipo}</Text>
            <Text style={styles.textoItem}>
              Principio Activo: {item.principio_activo}
            </Text>
            <Text style={styles.textoItem}>
              Laboratorio: {item.laboratorio}
            </Text>
            <Text style={styles.textoItem}>
              Certificado: {item.certificado}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditarProducto(item)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmarEliminarProducto(item.id, item.nombre)}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Editar Producto</Text>
            <TextInput
              style={styles.input}
              value={productoNombre}
              onChangeText={setProductoNombre}
              placeholder="Nombre"
            />
            <Dropdown
              style={styles.dropdown}
              data={tipoOptions}
              labelField="label"
              valueField="value"
              placeholder="Seleccione un tipo"
              value={productoTipo}
              onChange={(item) => setProductoTipo(item.value)}
            />
            <TextInput
              style={styles.input}
              value={productoPrincipioActivo}
              onChangeText={setProductoPrincipioActivo}
              placeholder="Principio Activo"
            />
            <TextInput
              style={styles.input}
              value={productoLaboratorio}
              onChangeText={setProductoLaboratorio}
              placeholder="Laboratorio"
            />
            <TextInput
              style={styles.input}
              value={productoCertificado}
              onChangeText={setProductoCertificado}
              placeholder="Certificado"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={guardarEdicion}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    color: "#fff",
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  textoItem: {
    color: "#fff",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
