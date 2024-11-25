import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//Importacion de pantallas
import DonYeyoHi from './pages/donyeyohiScreen';


// Pantalla principal (Home)
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>San Agustín</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DonYeyoHi')}
      >
        <Text style={styles.buttonText}>Ir a Don Yeyo H.I</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();


function AppContent() {
  const insets = useSafeAreaInsets();

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DonYeyoHi" component={DonYeyoHi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
 
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

// Estilos básicos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});


