import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import TabsNavigator from "./pages/navigation/TabsNavigator";
import { DataProvider } from "./utils/DataContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />
      <DataProvider>
        <TabsNavigator />
      </DataProvider>
    </SafeAreaProvider>
  );
}

