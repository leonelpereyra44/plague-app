import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function InformacionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de la Aplicación</Text>
      <Text>Versión: 0.0.1</Text>
      <Text>Desarrollado por Leonel Pereyra</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
