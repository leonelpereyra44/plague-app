import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { supabase } from "../../utils/database/supabaseClient";
export default function Productos({ productosData, setProductosData }) {
  const [productos, setProductos] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedProducto, setSelectedProducto] = useState("");
  const [selectedPrincipioActivo, setSelectedPrincipioActivo] = useState("");
  const [selectedLaboratorio, setSelectedLaboratorio] = useState("");
  const [selectedCertificado, setSelectedCertificado] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar datos de Supabase al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("productos").select("*");

      if (error) {
        console.error("Error al obtener los productos:", error.message);
        setProductos([]);
      } else if (Array.isArray(data)) {
        setProductos(data);
      }
      setLoading(false);
    };

    fetchProductos();
  }, []);

  // Actualiza los detalles del producto seleccionado
  const handleProductoChange = (item) => {
    setSelectedProducto(item.value);
    const productoSeleccionado = productos.find((p) => p.nombre === item.value);
    if (productoSeleccionado) {
      setSelectedPrincipioActivo(productoSeleccionado.principio_activo);
      setSelectedLaboratorio(productoSeleccionado.laboratorio);
      setSelectedCertificado(productoSeleccionado.certificado);
    } else {
      LimpiarProductos();
    }
  };

  // Función para limpiar los campos seleccionados
  const LimpiarProductos = () => {
    setSelectedProducto("");
    setSelectedPrincipioActivo("");
    setSelectedLaboratorio("");
    setSelectedCertificado("");
  };

  // Función para manejar el botón "Agregar"
  const handleAdd = () => {
    if (!selectedProducto) {
      alert("Por favor, selecciona un producto.");
      return;
    }

    // Crear un nuevo objeto con los datos seleccionados
    const newEntry = {
      Producto: selectedProducto,
      Tipo: selectedTipo,
      PrincipioActivo: selectedPrincipioActivo,
      Laboratorio: selectedLaboratorio,
      Certificado: selectedCertificado,
    };

    // Agregar el nuevo producto a productosData
    setProductosData((prev) => [...prev, newEntry]);
    alert(`Producto "${selectedProducto}" agregado correctamente.`);
    LimpiarProductos();
  };

  // Función para manejar el botón "Eliminar"
  const handleDelete = () => {
    if (productosData.length === 0) {
      alert("No hay registros para eliminar.");
      return;
    }

    // Eliminar el último registro de la lista
    setProductosData((prev) => prev.slice(0, -1));
    alert("Último registro eliminado.");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Dropdown Tipo */}
        <Dropdown
          data={[
            { label: "Roedores", value: "ROEDORES" },
            { label: "Insecticidas", value: "INSECTICIDA" },
          ]}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedTipo}
          placeholder="Seleccione el tipo de producto"
          onChange={(item) => setSelectedTipo(item.value)}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />

        {/* Dropdown Producto */}
        <Dropdown
          data={productos
            .filter((p) => p.tipo === selectedTipo)
            .map((p) => ({
              label: p.nombre,
              value: p.nombre,
            }))}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedProducto}
          placeholder="Seleccione el producto"
          onChange={handleProductoChange}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />

        {/* Botones */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Lista de datos agregados */}
      {productosData?.length > 0 && (
        <View style={styles.spreadsheet}>
          <View style={[styles.containerData, styles.headerData]}>
            <Text style={[styles.titledatos, styles.column]}>Producto</Text>
            <Text style={[styles.titledatos, styles.column]}>Tipo</Text>
            <Text style={[styles.titledatos, styles.column]}>
              Principio Activo
            </Text>
            <Text style={[styles.titledatos, styles.column]}>Laboratorio</Text>
            <Text style={[styles.titledatos, styles.column]}>Certificado</Text>
          </View>
          {productosData.map((entry, index) => (
            <View style={styles.containerData} key={index}>
              <Text style={[styles.datos, styles.column]}>
                {entry.Producto}
              </Text>
              <Text style={[styles.datos, styles.column]}>{entry.Tipo}</Text>
              <Text style={[styles.datos, styles.column]}>
                {entry.PrincipioActivo}
              </Text>
              <Text style={[styles.datos, styles.column]}>
                {entry.Laboratorio}
              </Text>
              <Text style={[styles.datos, styles.column]}>
                {entry.Certificado}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#1b3b4f", // Fondo similar al del logo
  },
  card: {
    marginBottom: 20,
    padding: 20,
    gap: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  containerAgregar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra para Android
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#28A745", // Verde para "Agregar"
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonSecondary: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#DC3545", // Rojo para "Cerrar"
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  spreadsheet: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden", // Evita que el contenido sobresalga
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#FFF",
  },
  headerData: {
    backgroundColor: "#007AFF",
    borderBottomWidth: 2,
    borderBottomColor: "#005BB5",
  },
  titledatos: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    color: "#FFF",
  },
  datos: {
    fontSize: 10,
    textAlign: "center",
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
});
