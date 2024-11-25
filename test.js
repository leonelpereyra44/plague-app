import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown'; // Usamos Dropdown directamente.

import {ubicacionVoladores, densidadVoladores, reposicionVoladores, observacionesVoladores} from './utils/voladores'; //valores de Voladores

function AppContent() {
  const insets = useSafeAreaInsets();

  // Estados para manejar los voladores
  const [showVoladores, setShowVoladores] = useState(false); // Estado para mostrar u ocultar los voladores
  const [selectedUbicacionVoladores, setSelectedUbicacionVoladores] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedDensidadVoladores, setSelectedDensidadVoladores] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedReposicionVoladores, setSelectedReposicionVoladores] = useState(""); // Estado para manejar la selección en el Dropdown
  const [selectedObservacionesVoladores, setSelectedObservacionesVoladores] = useState(""); // Estado para manejar la selección en el Dropdown
  // Estado para controlar la visibilidad de los dropdowns y botones
  const [showDropdowns, setShowDropdowns] = useState(true);

  // Estados para manejar los caminadores
  const [showCaminadores, setShowCaminadores] = useState(false); // Estado para mostrar u ocultar los caminadores
  const [selectedCaminadores, setSelectedCaminadores] = useState(""); // Estado para manejar la selección en el Dropdown
  // Estados para manejar los roedores
  const [showRoedores, setShowRoedores] = useState(false); // Estado para mostrar u ocultar los roedores
  const [selectedRoedores, setSelectedRoedores] = useState(""); // Estado para manejar la selección en el Dropdown

  // Función para mostrar u ocultar los voladores
  const DesplegarVoladores = () => {
    setShowVoladores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los voladores
    setShowDropdowns(true); // Mostrar los dropdowns cuando se despliegan los voladores
  };
  // Función para mostrar u ocultar los caminadores
  const DesplegarCaminadores = () => {
    setShowCaminadores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los caminadores
  };
  // Función para mostrar u ocultar los roedores
  const DesplegarRoedores = () => {
    setShowRoedores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los roedores
  };

  return (
    <ScrollView>
      <StatusBar style="auto" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={[styles.titulo]}>Planilla: Don Yeyo H.I</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={styles.touchable} onPress={DesplegarVoladores}>
            <Text style={styles.textTouchable}>Voladores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={DesplegarCaminadores}>
            <Text style={styles.textTouchable}>Caminadores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={DesplegarRoedores}>
            <Text style={styles.textTouchable}>Roedores</Text>
          </TouchableOpacity>
        </View>

        {/* Mostrar u ocultar los voladores */}
        {showVoladores && (
          <View style={styles.voladoresContainer}>
            {showDropdowns && (
              <>
                <Dropdown
                  data={ubicacionVoladores}
                  search
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedUbicacionVoladores} // Valor actualmente seleccionado
                  placeholder="Ubicación:"
                  onChange={(item) => {
                    setSelectedUbicacionVoladores(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />
                <Dropdown
                  data={densidadVoladores}
                  search
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedDensidadVoladores} // Valor actualmente seleccionado
                  placeholder="Densidad:"
                  onChange={(item) => {
                    setSelectedDensidadVoladores(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />
                <Dropdown
                  data={reposicionVoladores}
                  search
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedReposicionVoladores} // Valor actualmente seleccionado
                  placeholder="Reposición:"
                  onChange={(item) => {
                    setSelectedReposicionVoladores(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />
                <Dropdown
                  data={observacionesVoladores}
                  search
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedObservacionesVoladores} // Valor actualmente seleccionado
                  placeholder="Observaciones:"
                  onChange={(item) => {
                    setSelectedObservacionesVoladores(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                  <TouchableOpacity style={styles.touchable} onPress={() => setShowDropdowns(false)}>
                    <Text>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.touchable}>
                    <Text>Agregar otro</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
