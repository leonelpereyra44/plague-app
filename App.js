import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  StatusBar,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importación de pantallas
import GenerarPlanilla from "./pages/generarPlanilla";
import Clientes from "./pages/clientes";
import Productos from "./pages/productos";

// Importa el DataProvider
import { DataProvider } from "./utils/DataContext";

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get("window");
const scaleFont = (size) => size * PixelRatio.getFontScale();

// Pantalla principal (Home)
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        San Agustín
      </Text>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GenerarPlanilla")}
          accessible
          accessibilityLabel="Nueva Planilla"
        >
          <Text style={styles.buttonText}>Nueva Planilla</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Clientes")}
          accessible
          accessibilityLabel="Clientes"
        >
          <Text style={styles.buttonText}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Productos")}
          accessible
          accessibilityLabel="Productos"
        >
          <Text style={styles.buttonText}>Productos</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function AppContent() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GenerarPlanilla"
          component={GenerarPlanilla}
          options={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name="Clientes"
          component={Clientes}
          options={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name="Productos"
          component={Productos}
          options={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />
      {/* Envolver la aplicación con DataProvider */}
      <DataProvider>
        <AppContent />
      </DataProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1b3b4f", // Fondo similar al del logo
  },
  containerButtons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
  title: {
    fontSize: scaleFont(36), // Tamaño más grande
    fontWeight: "bold",
    marginTop: 40, // Espaciado extra para separar el texto de los botones
    color: "#ffffff", // Color blanco para el texto
    textAlign: "center",
    textTransform: "uppercase", // Todo en mayúsculas
    borderBottomWidth: 2, // Línea decorativa
    borderBottomColor: "#4CAF50",
    paddingBottom: 10, // Espaciado entre el texto y la línea
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: height * 0.02,
    borderRadius: 15,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.6, // Ancho fijo para todos los botones
  },
  buttonText: {
    color: "#fff",
    fontSize: scaleFont(18),
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    backgroundColor: "#4CAF50",
  },
  headerTitle: {
    fontSize: scaleFont(22),
    fontWeight: "bold",
    color: "#fff",
  },
});
