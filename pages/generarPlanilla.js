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

  const [showVoladores, setShowVoladores] = useState(false);
  const [showRastreros, setShowRastreros] = useState(false);
  const [showRoedores, setShowRoedores] = useState(false);
  const [showProductos, setShowProductos] = useState(false);
  const [showCliente, setShowCliente] = useState(false);
  const [showExportar, setShowExportar] = useState(false);
  const [showUsuario, setShowUsuario] = useState(false);
  const [titulo, setTitulo] = useState("Nueva Planilla");

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

  const DesplegarSeccion = (seccion) => {
    const secciones = {
      voladores: setShowVoladores,
      rastreros: setShowRastreros,
      roedores: setShowRoedores,
      productos: setShowProductos,
      cliente: setShowCliente,
      exportar: setShowExportar,
      usuario: setShowUsuario,
    };

    Object.keys(secciones).forEach((key) => {
      secciones[key](false);
    });

    secciones[seccion](true);
    setTitulo(seccion.charAt(0).toUpperCase() + seccion.slice(1));
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1b3b4f" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Contenedor para el título y el menú */}
        <View style={styles.header}>
          <Text style={styles.titulo}>{titulo}</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollMenu}
          >
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => DesplegarSeccion("cliente")}
              >
                <Text style={styles.textTouchable}>Cliente</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => DesplegarSeccion("voladores")}
              >
                <Text style={styles.textTouchable}>Voladores</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => DesplegarSeccion("rastreros")}
              >
                <Text style={styles.textTouchable}>Rastreros</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => DesplegarSeccion("roedores")}
              >
                <Text style={styles.textTouchable}>Roedores</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => DesplegarSeccion("productos")}
              >
                <Text style={styles.textTouchable}>Productos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => DesplegarSeccion("exportar")}
              >
                <Text style={styles.textTouchable}>Exportar a Excel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {/* Contenido desplazable */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Mostrar u ocultar las secciones correspondientes */}
          {showCliente && (
            <Cliente
              onClose={() => setShowCliente(false)}
              clienteData={clienteData}
              setClienteData={setClienteData}
            />
          )}
          {showVoladores && (
            <Voladores
              onClose={() => setShowVoladores(false)}
              voladoresData={voladoresData}
              setVoladoresData={setVoladoresData}
            />
          )}
          {showRastreros && (
            <Rastreros
              onClose={() => setShowRastreros(false)}
              rastrerosData={rastrerosData}
              setRastrerosData={setRastrerosData}
            />
          )}
          {showRoedores && (
            <Roedores
              onClose={() => setShowRoedores(false)}
              roedoresData={roedoresData}
              setRoedoresData={setRoedoresData}
            />
          )}
          {showProductos && (
            <Productos
              onClose={() => setShowProductos(false)}
              productosData={productosData}
              setProductosData={setProductosData}
            />
          )}
          {showExportar && (
            <Exportar
              onClose={() => setShowExportar(false)}
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
