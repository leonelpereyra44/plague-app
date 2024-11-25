import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown'; // Usamos Dropdown directamente.
import { ubicacionVoladores, densidadVoladores, reposicionVoladores, observacionesVoladores } from '../utils/voladores'; //valores de Voladores
import { laboratorioCaminadores, principioActivoCaminadores, productoCaminadores } from '../utils/caminadores'; //valores de Caminadores
import { roedoresVivos, roedoresMuertos, materiaFecal, tipoTrampa, consumoCebos, reposicionRoedores } from '../utils/roedores'; //valores de Roedores

export default function DonYeyoHi() {

    const insets = useSafeAreaInsets();

    //Estados para manejar los voladores
    const [showVoladores, setShowVoladores] = useState(false); // Estado para mostrar u ocultar los voladores
    const [selectedUbicacionVoladores, setSelectedUbicacionVoladores] = useState(""); // Estado para manejar la selección en el Dropdown
    const [selectedDensidadVoladores, setSelectedDensidadVoladores] = useState(""); 
    const [selectedReposicionVoladores, setSelectedReposicionVoladores] = useState(""); 
    const [selectedObservacionesVoladores, setSelectedObservacionesVoladores] = useState(""); 
    //Estados para manejar los caminadores
    const [showCaminadores, setShowCaminadores] = useState(false); // Estado para mostrar u ocultar los caminadores
    const [ubicacionCaminadores, setUbicacionCaminadores] = useState(""); // Estado para manejar el texto del input
    const [selectedProductoCaminadores, setSelectedProductoCaminadores] = useState(""); // Estado para manejar la selección en el Dropdown
    const [selectedPrincipioActivoCaminadores, setSelectedPrincipioActivoCaminadores] = useState(""); 
    const [selectedLaboratorioCaminadores, setSelectedLaboratorioCaminadores] = useState("");
    const [aprobacionSenasa, setAprobacionSenasa] = useState("");
    const [observacionesCaminadores, setObservacionesCaminadores] = useState("");
    //Estados para manejar los roedores
    const [showRoedores, setShowRoedores] = useState(false); // Estado para mostrar u ocultar los roedores
    const [cajaRoedores, setCajaRoedores] = useState(""); // Estado para manejar la selección en el Dropdown
    const [selectedRoedoresVivos, setSelectedRoedoresVivos] = useState(""); // Estado para manejar la selección en el Dropdown
    const [selectedRoedoresMuertos, setSelectedRoedoresMuertos] = useState(""); // Estado para manejar la selección en el Dropdown
    const [selectedTipoTrampa, setSelectedTipoTrampa] = useState(""); // Estado para manejar la selección en el Dropdown
    const [selectedMateriaFecal, setSelectedMateriaFecal] = useState(""); // Estado para manejar la selección en el Dropdown
    const [selectedConsumoCebos, setSelectedConsumoCebos] = useState(""); // Estado para manejar la selección en el Dropdown
    const [selectedReposicionRoedores, setSelectedReposicionRoedores] = useState(""); // Estado para manejar la selección en el Dropdown

    //Arrays para manejar los datos.
    const [voladoresData, setVoladoresData] = useState([]); // Estado para manejar los datos de los voladores
    const [caminadoresData, setCaminadoresData] = useState([]); // Estado para manejar los datos de los caminadores
    const [roedoresData, setRoedoresData] = useState([]); // Estado para manejar los datos de los roedores

    //Función para mostrar u ocultar los voladores
    const DesplegarVoladores = () => {
    setShowVoladores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los voladores
    setShowCaminadores(false); // Ocultar los caminadores cuando se despliegan los voladores
    setShowRoedores(false); 
    };
    //Función para mostrar u ocultar los caminadores
    const DesplegarCaminadores = () => {
    setShowCaminadores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los caminadores
    setShowVoladores(false); 
    setShowRoedores(false);
    };
    //Función para mostrar u ocultar los roedores
    const DesplegarRoedores = () => {
    setShowRoedores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los roedores
    setShowCaminadores(false); 
    setShowVoladores(false); 
    };

    //Funciones para limpiar los campos
    const LimpiarVoladores = () => { // Función para limpiar los campos de los voladores
      setSelectedUbicacionVoladores("");
      setSelectedDensidadVoladores("");
      setSelectedReposicionVoladores("");
      setSelectedObservacionesVoladores("");
    };

    const LimpiarCaminadores = () => { // Función para limpiar los campos de los caminadores
      setUbicacionCaminadores("");
      setSelectedProductoCaminadores("");
      setSelectedPrincipioActivoCaminadores("");
      setSelectedLaboratorioCaminadores("");
      setAprobacionSenasa("");
      setObservacionesCaminadores("");
    }; 

    const LimpiarRoedores = () => { // Función para limpiar los campos de los roedores
      setCajaRoedores("");
      setSelectedRoedoresVivos("");
      setSelectedRoedoresMuertos("");
      setSelectedTipoTrampa("");
      setSelectedMateriaFecal("");
      setSelectedConsumoCebos("");
      setSelectedReposicionRoedores("");
    };
    return (
        <ScrollView>
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
          </View>
              {/* Mostrar u ocultar los voladores */}
              {showVoladores && (
              <View style={styles.voladoresContainer}>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:20}}>
                  <TouchableOpacity 
                    style={styles.touchable} 
                    onPress={() => {
                      if (!selectedUbicacionVoladores || !selectedDensidadVoladores || !selectedReposicionVoladores || !selectedObservacionesVoladores) {
                        alert('Por favor, complete todos los campos');
                        return;
                      } else {
                        const newEntry = [
                          selectedUbicacionVoladores,
                          selectedDensidadVoladores,
                          selectedReposicionVoladores,
                          selectedObservacionesVoladores
                        ];
                        setVoladoresData((prev) => [...prev, newEntry]); // Agrega el nuevo registro
                        //Resetea los campos
                        LimpiarVoladores();
                  }
                  alert('Datos guardados con exito');
                  }}>
                    <Text>Agregar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.touchable} onPress={() => {
                    setShowVoladores(false);
                    LimpiarVoladores();
                  }}>
                    <Text>Cerrar</Text>
                  </TouchableOpacity>
                </View>
                {voladoresData.length > 0 && (
                  <View>
                    <View>
                      <Text>Datos guardados:</Text>
                    </View>
                    <View style={[styles.containerData, styles.header]}>
                      <Text style={[styles.titledatoscajas, styles.column]}>Ubicación</Text>
                      <Text style={[styles.titledatoscajas, styles.column]}>Densidad</Text>
                      <Text style={[styles.titledatoscajas, styles.column]}>Reposición</Text>
                      <Text style={[styles.titledatoscajas, styles.column]}>Observaciones</Text>
                    </View>
                      {voladoresData.map((entry, index) => (
                        <View style={styles.containerData} key={index}>
                          <Text style={[styles.datoscajas, styles.column]}>{`${entry[0]}`}</Text>
                          <Text style={[styles.datoscajas, styles.column]}>{`${entry[1]}`}</Text>
                          <Text style={[styles.datoscajas, styles.column]}>{`${entry[2]}`}</Text>
                          <Text style={[styles.datoscajas, styles.column]}>{`${entry[3]}`}</Text>
                        </View>
                    ))}
                  </View> 
                )} 
              </View>
            )}
            {/* Mostrar u ocultar los caminadores */}
              {showCaminadores && (
                <View style={styles.caminadoresContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => setUbicacionCaminadores(value)}
                    value={ubicacionCaminadores}
                    placeholder="Ubicación:"
                  />
                  <Dropdown
                    data={productoCaminadores}
                    search
                    maxHeight={200}
                    labelField="label" // Define la clave que contiene el texto visible
                    valueField="value" // Define la clave que contiene el valor interno
                    value={selectedProductoCaminadores} // Valor actualmente seleccionado
                    placeholder="Producto utilizado:"
                    onChange={(item) => {
                      setSelectedProductoCaminadores(item.value); // Cambiar el valor seleccionado
                    }}
                    style={styles.dropdown} // Estilo del componente Dropdown
                    placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                    selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                    inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                  />
                  <Dropdown
                    data={principioActivoCaminadores}
                    search
                    maxHeight={200}
                    labelField="label" // Define la clave que contiene el texto visible
                    valueField="value" // Define la clave que contiene el valor interno
                    value={selectedPrincipioActivoCaminadores} // Valor actualmente seleccionado
                    placeholder="Principio Activo:"
                    onChange={(item) => {
                      setSelectedPrincipioActivoCaminadores(item.value); // Cambiar el valor seleccionado
                    }}
                    style={styles.dropdown} // Estilo del componente Dropdown
                    placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                    selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                    inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                  />
                  <Dropdown
                    data={laboratorioCaminadores}
                    search
                    maxHeight={200}
                    labelField="label" // Define la clave que contiene el texto visible
                    valueField="value" // Define la clave que contiene el valor interno
                    value={selectedLaboratorioCaminadores} // Valor actualmente seleccionado
                    placeholder="Laboratorio:"
                    onChange={(item) => {
                      setSelectedLaboratorioCaminadores(item.value); // Cambiar el valor seleccionado
                    }}
                    style={styles.dropdown} // Estilo del componente Dropdown
                    placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                    selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                    inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => setAprobacionSenasa(value)}
                    value={aprobacionSenasa}
                    placeholder="Aprobación Senasa:"
                  />
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => setObservacionesCaminadores(value)}
                    value={observacionesCaminadores}
                    placeholder="Observaciones:"
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:20}}>
                    <TouchableOpacity 
                      style={styles.touchable} 
                      onPress={() => {
                        if (!ubicacionCaminadores || !selectedProductoCaminadores || !selectedPrincipioActivoCaminadores || !selectedLaboratorioCaminadores || !aprobacionSenasa || !observacionesCaminadores) {
                          alert('Por favor, complete todos los campos');
                          return;
                        } else {
                          const newEntry = [
                            ubicacionCaminadores,
                            selectedProductoCaminadores,
                            selectedPrincipioActivoCaminadores,
                            selectedLaboratorioCaminadores,
                            aprobacionSenasa,
                            observacionesCaminadores
                          ];
                          setCaminadoresData((prev) => [...prev, newEntry]); // Agrega el nuevo registro
                        //resetea los campos
                        LimpiarCaminadores();
                        }
                    }}>
                      <Text>Agregar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchable} onPress={() => {
                      setShowCaminadores(false);
                      LimpiarCaminadores();
                    }}>
                      <Text>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                  {caminadoresData.length > 0 && (
                    <View>
                      <Text>Datos guardados:</Text>
                      {caminadoresData.map((entry, index) => (
                        <Text style={styles.datoscajas} key={index}>{`${entry[0]}, - ${entry[1]}, - ${entry[2]}, - ${entry[3]}, - ${entry[4]}, - ${entry[5]}`}</Text>
                      ))}
                    </View>
                  )}  
                </View>
              )} 


            {/* Mostrar u ocultar los roedores */}
            {showRoedores && (
              <View style={styles.roedoresContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => setCajaRoedores(value)}
                  value={cajaRoedores}
                  placeholder="Caja N°:"
                />
                <Dropdown
                  data={roedoresVivos}
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedRoedoresVivos} // Valor actualmente seleccionado
                  placeholder="Roedores Vivos:"
                  onChange={(item) => {
                    setSelectedRoedoresVivos(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />
                <Dropdown
                  data={roedoresMuertos}
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedRoedoresMuertos} // Valor actualmente seleccionado
                  placeholder="Roedores Muertos:"
                  onChange={(item) => {
                    setSelectedRoedoresMuertos(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />
                <Dropdown
                  data={tipoTrampa}
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedTipoTrampa} // Valor actualmente seleccionado
                  placeholder="Trampa PEGA/TRAMPA: A/B"
                  onChange={(item) => {
                    setSelectedTipoTrampa(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />
                <Dropdown
                  data={materiaFecal}
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedMateriaFecal} // Valor actualmente seleccionado
                  placeholder="Materia fecal:"
                  onChange={(item) => {
                    setSelectedMateriaFecal(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />
                <Dropdown
                  data={consumoCebos}
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedConsumoCebos} // Valor actualmente seleccionado
                  placeholder="Consumo cebos:"
                  onChange={(item) => {
                    setSelectedConsumoCebos(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />
                <Dropdown
                  data={reposicionRoedores}
                  maxHeight={200}
                  labelField="label" // Define la clave que contiene el texto visible
                  valueField="value" // Define la clave que contiene el valor interno
                  value={selectedReposicionRoedores} // Valor actualmente seleccionado
                  placeholder="Reposición:"
                  onChange={(item) => {
                    setSelectedReposicionRoedores(item.value); // Cambiar el valor seleccionado
                  }}
                  style={styles.dropdown} // Estilo del componente Dropdown
                  placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
                  selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
                  inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
                />


                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:20}}>
                  <TouchableOpacity 
                    style={styles.touchable} 
                    onPress={() => {
                      if (!cajaRoedores || !selectedRoedoresVivos || !selectedRoedoresMuertos || !selectedTipoTrampa || !selectedMateriaFecal || !selectedConsumoCebos || !selectedReposicionRoedores) {
                        alert('Por favor, complete todos los campos');
                        return;
                      } else {
                        const newEntry = [
                          cajaRoedores,
                          selectedRoedoresVivos,
                          selectedRoedoresMuertos,
                          selectedTipoTrampa,
                          selectedMateriaFecal,
                          selectedConsumoCebos,
                          selectedReposicionRoedores
                        ];
                        setRoedoresData((prev) => [...prev, newEntry]); // Agrega el nuevo registro
                        // Resetea los campos
                        LimpiarRoedores();
                      }
                      alert('Datos guardados con exito');
                  }}
                  >
                    <Text>Agregar</Text>
                  </TouchableOpacity>

                    <TouchableOpacity style={styles.touchable} onPress={() => {
                      setShowRoedores(false);
                      LimpiarRoedores();
                    }}>
                      <Text>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                  {roedoresData.length > 0 && (
                <View>
                  <Text>Datos guardados:</Text>
                  {roedoresData.map((entry, index) => (
                    <Text style={styles.datoscajas} key={index}>{`${entry[0]}, - ${entry[1]}, - ${entry[2]}, - ${entry[3]}, - ${entry[4]}, - ${entry[5]}, - ${entry[6]}`}</Text>
                  ))}
                </View>
                )}
              </View>
            )}
        </ScrollView>
      
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 16,
    },
    touchable: {
      margin: 8,
      padding: 10,
      backgroundColor: 'lightgreen',
      borderRadius: 20,
    },
    textTouchable: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    voladoresContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      gap: 50,
      paddingVertical: 16,
      margin: 10,
    },
    caminadoresContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      gap: 50,
      paddingVertical: 16,
      margin: 10,
    },
    roedoresContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      gap: 50,
      paddingVertical: 16,
      margin: 10,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
      color: 'gray',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: 'black',
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    input: {
      height: 50,
      borderWidth: 1,
      padding: 10,
    },
    containerData: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc', // Línea divisoria para las filas
    },
    header: {
      backgroundColor: '#f0f0f0', // Fondo diferente para el encabezado
      borderBottomWidth: 2,
      borderBottomColor: '#000', // Línea más gruesa para encabezados
    },
    titledatoscajas: {
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
    },
    datoscajas: {
      fontSize: 14,
      textAlign: 'center',
    },
    column: {
      flex: 1, // Cada columna ocupa la misma proporción
      textAlign: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
      textAlign: 'center',
    },
  });



    