import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../home/HomeScreen"; // Nueva carpeta para Home
import InformacionScreen from "../informacion/InformacionScreen"; // Nueva pantalla
import GenerarPlanilla from "../generarPlanilla";
import Clientes from "../clientes";
import Productos from "../productos";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Pantallas secundarias dentro de un Stack Navigator
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#2ecc71" }, // Cambia el color del header
        headerTintColor: "#fff", // Cambia el color del texto y botones
        headerTitleStyle: { fontWeight: "bold" }, // Personaliza el texto del header
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="GenerarPlanilla" component={GenerarPlanilla} />
      <Stack.Screen name="Clientes" component={Clientes} />
      <Stack.Screen name="Productos" component={Productos} />
    </Stack.Navigator>
  );
}

// Tab Navigator principal
export default function TabsNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Inicio") {
              iconName = "home-outline";
            } else if (route.name === "Información") {
              iconName = "information-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2ecc71",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Inicio"
          component={MainStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Información" component={InformacionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
