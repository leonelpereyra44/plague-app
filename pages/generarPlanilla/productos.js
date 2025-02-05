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
import globalStyles from "../../utils/styles/globalStyles";

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
      <View style={globalStyles.container}>
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View style={globalStyles.form}>
        <Text style={globalStyles.title}>Productos</Text>
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
          style={globalStyles.dropdown}
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
          style={globalStyles.dropdown}
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
      {/* Lista de datos agregados */}
      {productosData?.length > 0 && (
        <View style={globalStyles.spreadsheet}>
          <View style={globalStyles.headerData}>
            <Text style={globalStyles.headerText}>Producto</Text>
            <Text style={globalStyles.headerText}>Tipo</Text>
            <Text style={globalStyles.headerText}>Principio Activo</Text>
            <Text style={globalStyles.headerText}>Laboratorio</Text>
            <Text style={globalStyles.headerText}>Certificado</Text>
          </View>
          {productosData.map((entry, index) => (
            <View style={globalStyles.containerData} key={index}>
              <Text style={globalStyles.column}>{entry.Producto}</Text>
              <Text style={globalStyles.column}>{entry.Tipo}</Text>
              <Text style={globalStyles.column}>{entry.PrincipioActivo}</Text>
              <Text style={globalStyles.column}>{entry.Laboratorio}</Text>
              <Text style={globalStyles.column}>{entry.Certificado}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
});
