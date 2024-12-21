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
import ListarClientes from "../utils/listarClientes"; // Importa el componente de clientes
import AgregarClientes from "../utils/agregarClientes";

export default function Clientes() {
  const insets = useSafeAreaInsets();

  // Accede directamente a clienteData y setClienteData desde el contexto
  const { clienteData, setClienteData } = useData(); // Obtiene el contexto correctamente

  const [showClientes, setShowClientes] = useState(false); // Estado para mostrar los clientes
  const [showAgregarClientes, setShowAgregarClientes] = useState(false); // Estado para mostrar el formulario de agregar clientes
  const [titulo, setTitulo] = useState("Clientes"); // Estado para manejar el título de la planilla

  const DesplegarClientes = () => {
    setShowClientes((prev) => !prev); // Cambia el estado de mostrar clientes
    setShowAgregarClientes(false); // Oculta el formulario de agregar clientes
    setTitulo("Clientes"); // Cambia el título de la planilla
  };

  const DesplegarAgregarClientes = () => {
    setShowAgregarClientes((prev) => !prev); // Cambia el estado de mostrar clientes
    setShowClientes(false); // Oculta la lista de clientes
    setTitulo("Agregar Cliente"); // Cambia el título de la planilla
  }

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
                onPress={DesplegarClientes}
              >
                <Text style={styles.textTouchable}>Clientes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchable}
                onPress={DesplegarAgregarClientes}
              >
                <Text style={styles.textTouchable}>Nuevo Cliente</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {showClientes && (
          <ListarClientes
            onClose={() => setShowClientes(false)}
            clienteData={clienteData} // Pasa clienteData directamente
            setClienteData={setClienteData} // Pasa setClienteData directamente
          />
        )}
        {showAgregarClientes && (
          <AgregarClientes
            onClose={() => setShowAgregarClientes(false)}
            clienteData={clienteData} // Pasa clienteData directamente
            setClienteData={setClienteData} // Pasa setClienteData directamente
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
