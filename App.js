import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  StatusBar
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Importación de pantallas
import GenerarPlanilla from "./pages/generarPlanilla";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <AppContent />
    </SafeAreaProvider>
  );
}

// Estilos accesibles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9", // Fondo claro para destacar el texto
  },
  containerButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    fontSize: scaleFont(36), // Tamaño más grande
    fontWeight: "bold",
    marginTop: 40, // Espaciado extra para separar el texto de los botones
    color: "#2E86C1", // Color azul elegante
    textAlign: "center",
    textTransform: "uppercase", // Todo en mayúsculas
    borderBottomWidth: 2, // Línea decorativa
    borderBottomColor: "#4CAF50",
    paddingBottom: 10, // Espaciado entre el texto y la línea
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.2,
    borderRadius: 15,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
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



