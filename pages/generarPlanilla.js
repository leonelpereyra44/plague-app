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
