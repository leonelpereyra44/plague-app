import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useData } from "../utils/DataContext"; // Asegúrate de importar el contexto
import ListarProductos from "../utils/listarProductos"; // Importa el componente de productos
import AgregarProductos from "../utils/agregarProductos";

export default function Productos() {
  const insets = useSafeAreaInsets();

  const { productoData, setProductoData } = useData(); // Obtiene el contexto correctamente
  const [showProductos, setShowProductos] = useState(false); // Estado para mostrar los productos
  const [showAgregarProductos, setShowAgregarProductos] = useState(false); // Estado para mostrar el formulario de agregar productos
  const [titulo, setTitulo] = useState("Productos"); // Estado para manejar el título de la planilla
  
  const DesplegarProductos = () => {
    setShowProductos((prev) => !prev); // Cambia el estado de mostrar productos
    setTitulo("Lista de Productos"); // Cambia el título a "Productos"
    setShowAgregarProductos(false); // Oculta el formulario de agregar productos
  };

  const DesplegarAgregarProductos = () => {
    setShowAgregarProductos((prev) => !prev); // Cambia el estado de mostrar el formulario de agregar productos
    setTitulo("Agregar Productos"); // Cambia el título a "Agregar Productos"
    setShowProductos(false); // Oculta la lista de productos
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1b3b4f" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Contenedor para el título y el menú */}
        <View style={styles.header}>
          <Text style={styles.titulo} numberOfLines={1} ellipsizeMode="tail">
            {titulo}
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollMenu}
          >
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={DesplegarProductos}
              >
                <Text style={styles.textTouchable}>Productos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={DesplegarAgregarProductos}
              >
                <Text style={styles.textTouchable}>Agregar Productos</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {showProductos && (
          <ListarProductos
            onClose={() => setShowProductos(false)}
            productoData={productoData}
            setProductoData={setProductoData}
          />
        )}
        {showAgregarProductos && (
          <AgregarProductos
            onClose={() => setShowAgregarProductos(false)}
            productoData={productoData}
            setProductoData={setProductoData}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b3b4f",
  },
  header: {
    backgroundColor: "#1b3b4f", // Fondo igual al resto
    gap: 20,
    zIndex: 10,
    elevation: 10,
    paddingBottom: 10, // Espacio para separar el título del menú
    marginBottom: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#ffffff",
    backgroundColor: "#2c3e50",
    margin: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginBottom: 10,
  },

  scrollMenu: {
    flexDirection: "row", // Asegura que los elementos estén en línea
    paddingHorizontal: 10, // Espacio para el contenido
  },
  menu: {
    flexDirection: "row",
    justifyContent: "flex-start", // Los elementos se alinean al inicio
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  touchable: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  textTouchable: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
