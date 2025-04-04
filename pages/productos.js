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
import ListarProductos from "./productos/listarProductos";
import AgregarProductos from "./productos/agregarProductos";

export default function Productos() {
  const insets = useSafeAreaInsets();
  const { productoData, setProductoData } = useData();
  const [seccionSeleccionada, setSeccionSeleccionada] = useState("productos");

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1b3b4f" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollMenu}
          >
            <View style={styles.menu}>
              {[
                { label: "Productos", value: "productos" },
                { label: "Agregar Productos", value: "agregarProductos" },
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

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.contentContainer}>
            {seccionSeleccionada === "productos" && (
              <ListarProductos
                onClose={() => setSeccionSeleccionada("")}
                productoData={productoData}
                setProductoData={setProductoData}
              />
            )}
            {seccionSeleccionada === "agregarProductos" && (
              <AgregarProductos
                onClose={() => setSeccionSeleccionada("")}
                productoData={productoData}
                setProductoData={setProductoData}
              />
            )}
          </View>
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
    paddingTop: 10,
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
