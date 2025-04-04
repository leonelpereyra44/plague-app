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
import { useData } from "../utils/DataContext";
import Voladores from "./generarPlanilla/voladores";
import Rastreros from "./generarPlanilla/rastreros";
import Roedores from "./generarPlanilla/roedores";
import Productos from "./generarPlanilla/productos";
import Cliente from "./generarPlanilla/cliente";
import Exportar from "./generarPlanilla/exportar";

export default function GenerarPlanilla() {
  const insets = useSafeAreaInsets();
  const [seccionSeleccionada, setSeccionSeleccionada] = useState("cliente");

  const {
    voladoresData,
    setVoladoresData,
    rastrerosData,
    setRastrerosData,
    roedoresData,
    setRoedoresData,
    productosData,
    setProductosData,
    clienteData,
    setClienteData,
    exportarData,
    setExportarData,
  } = useData();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1b3b4f" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View>
          {/* <Text style={styles.titulo}>Generar Planilla</Text> */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollMenu}
          >
            <View style={styles.menu}>
              {[
                { label: "Cliente", value: "cliente" },
                { label: "Voladores", value: "voladores" },
                { label: "Rastreros", value: "rastreros" },
                { label: "Roedores", value: "roedores" },
                { label: "Productos", value: "productos" },
                { label: "Exportar", value: "exportar" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.touchable}
                  onPress={() => setSeccionSeleccionada(item.value)}
                >
                  <Text style={styles.textTouchable}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Contenido desplazable */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {seccionSeleccionada === "cliente" && (
            <Cliente
              clienteData={clienteData}
              setClienteData={setClienteData}
            />
          )}
          {seccionSeleccionada === "voladores" && (
            <Voladores
              voladoresData={voladoresData}
              setVoladoresData={setVoladoresData}
            />
          )}
          {seccionSeleccionada === "rastreros" && (
            <Rastreros
              rastrerosData={rastrerosData}
              setRastrerosData={setRastrerosData}
            />
          )}
          {seccionSeleccionada === "roedores" && (
            <Roedores
              roedoresData={roedoresData}
              setRoedoresData={setRoedoresData}
            />
          )}
          {seccionSeleccionada === "productos" && (
            <Productos
              productosData={productosData}
              setProductosData={setProductosData}
            />
          )}
          {seccionSeleccionada === "exportar" && (
            <Exportar
              clienteData={clienteData}
              productosData={productosData}
              voladoresData={voladoresData}
              rastrerosData={rastrerosData}
              roedoresData={roedoresData}
              exportarData={exportarData}
              setExportarData={setExportarData}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b3b4f",
  },
  scrollMenu: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
  },
  scrollContainer: {
    padding: 10,
  },
  touchable: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  textTouchable: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});




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
import ListarProductos from "./productos/listarProductos"; // Importa el componente de productos
import AgregarProductos from "./productos/agregarProductos";

export default function Productos() {
  const insets = useSafeAreaInsets();

  const { productoData, setProductoData } = useData(); // Obtiene el contexto correctamente
  const [showProductos, setShowProductos] = useState(false); // Estado para mostrar los productos
  const [showAgregarProductos, setShowAgregarProductos] = useState(false); // Estado para mostrar el formulario de agregar productos
  const DesplegarProductos = () => {
    setShowProductos((prev) => !prev); // Cambia el estado de mostrar productos
    setShowAgregarProductos(false); // Oculta el formulario de agregar productos
  };

  const DesplegarAgregarProductos = () => {
    setShowAgregarProductos((prev) => !prev); // Cambia el estado de mostrar el formulario de agregar productos
    setShowProductos(false); // Oculta la lista de productos
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1b3b4f" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Contenedor para el título y el menú */}
        <View style={styles.header}>
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