import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function InformacionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información de la Aplicación</Text>
      <Text style={styles.text}>Versión: 0.0.1</Text>
      <Text style={styles.text}>Desarrollado por Leonel Pereyra</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b3b4f",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff",
  },
});
