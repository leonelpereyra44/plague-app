import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../home/HomeScreen";
import InformacionScreen from "../informacion/InformacionScreen";
import GenerarPlanilla from "../generarPlanilla";
import Clientes from "../clientes";
import Productos from "../productos";
import Certificado from "../certificado";
import Estadisticas from "../estadisticas";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Ruta del logo
const logoPath = require("../../assets/cropped_icon.png"); // Asegúrate de que la ruta sea correcta

// Stack Navigator para pantallas secundarias
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#2ecc71" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="San Agustín"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Image
              source={logoPath}
              style={{ width: 40, height: 40, marginRight: 15 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Stack.Screen name="GenerarPlanilla" component={GenerarPlanilla} />
      <Stack.Screen name="Clientes" component={Clientes} />
      <Stack.Screen name="Productos" component={Productos} />
      <Stack.Screen name="Certificado" component={Certificado} />
      <Stack.Screen name="Estadisticas" component={Estadisticas} />
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
            let iconName = "alert-circle-outline";
            if (route.name === "Inicio") {
              iconName = "home-outline";
            } else if (route.name === "Información") {
              iconName = "information-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2ecc71",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "black" },
          headerStyle: { backgroundColor: "#2ecc71" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        })}
      >
        <Tab.Screen name="Inicio" component={MainStack} options={{ headerShown: false }} />
        <Tab.Screen
          name="Información"
          component={InformacionScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Ionicons
                name="information-circle-outline"
                size={32}
                color="#fff"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Información")}
              />
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


