import { React } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useData } from "../utils/DataContext"; // Asegúrate de importar el contexto

export default function Estadisticas() {
  const insets = useSafeAreaInsets();

  // Accede directamente a clienteData y setClienteData desde el contexto
  const { clienteData, setClienteData } = useData(); // Obtiene el contexto correctamente

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Estadísticas</Text>
      <Text style={styles.text}>Aquí van las estadísticas</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});