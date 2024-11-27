import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Empresa({ onClose, empresaData, setEmpresaData }) {
  const [date, setDate] = useState(new Date()); // Estado para manejar la fecha
  const [showPicker, setShowPicker] = useState(false); // Estado para mostrar u ocultar el selector de fecha
  const [fechaDelDia, setFechaDelDia] = useState(""); // Estado para manejar la fecha en formato legible
  const [fieldsDisabled, setFieldsDisabled] = useState(false); // Estado para controlar si los campos están deshabilitados

  const empresas = [{ label: "Don Yeyo", value: "Don Yeyo" }];

  const plantas = [
    { label: "Hipolito Yrigoyen", value: "Hipolito Yrigoyen" },
    { label: "Elguea Roman", value: "Elguea Roman" },
  ];

  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [selectedPlantaEmpresa, setSelectedPlantaEmpresa] = useState("");

  const LimpiarEmpresa = () => {
    setSelectedEmpresa(""); // Limpia el estado local
    setSelectedPlantaEmpresa(""); // Limpia el estado local
    setFechaDelDia(""); // Limpia el estado local
    setShowPicker(false); // Resetea el estado del picker de fecha
  };

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false); // Oculta el selector después de la selección
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD
      setFechaDelDia(formattedDate); // Actualiza el estado con la fecha formateada
    }
  };

  const handleAdd = () => {
    if (!selectedEmpresa || !selectedPlantaEmpresa || !fechaDelDia) {
      alert("Por favor, complete todos los campos");
      return;
    } else {
      const newEntry = {
        cliente: selectedEmpresa,
        planta: selectedPlantaEmpresa,
        fecha: fechaDelDia,
      };
      setEmpresaData((prev) => [...prev, newEntry]); // Agrega el nuevo registro

      // Bloquea los campos después de agregar el primer dato
      setFieldsDisabled(true);

      // Resetea los campos
      LimpiarEmpresa();
      alert("Datos guardados correctamente");
    }
  };

  return (
    <ScrollView>
      <View style={styles.empresaContainer}>
        <Dropdown
          data={empresas}
          labelField="label"
          valueField="value"
          placeholder="Seleccione cliente"
          value={selectedEmpresa} // Estado actual de la selección
          onChange={(item) => {
            setSelectedEmpresa(item.value); // Actualiza el estado local
          }}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          disable={fieldsDisabled} // Deshabilita el campo si no se ha seleccionado la empresa
        />
        <Dropdown
          data={plantas}
          labelField="label"
          valueField="value"
          placeholder="Seleccione planta"
          value={selectedPlantaEmpresa} // Estado actual de la selección
          onChange={(item) => {
            setSelectedPlantaEmpresa(item.value); // Actualiza el estado local
          }}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          disable={fieldsDisabled} // Deshabilita el campo si no se ha seleccionado la empresa
        />
        {/* TextInput para la fecha */}
        <TextInput
          style={styles.input}
          placeholder="Seleccione una fecha"
          value={fechaDelDia}
          onFocus={() => setShowPicker(true)} // Abre el selector de fecha al enfocar
          editable={!fieldsDisabled} // Deshabilita el campo si no se ha seleccionado la empresa
        />

        {/* DateTimePicker */}
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange} // Maneja la selección
          />
        )}

        <View style={styles.containerAgregar}>
          <TouchableOpacity style={styles.touchable} onPress={handleAdd}>
            <Text>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              onClose();
              LimpiarEmpresa();
            }}
          >
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
        {empresaData.length > 0 && (
          <View style={styles.spreadsheet}>
            <View style={[styles.containerData, styles.headerData]}>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Cliente
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Planta
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>Fecha</Text>
            </View>
            {empresaData.map((entry, index) => (
              <View style={styles.containerData} key={index}>
                <Text style={[styles.datosEmpresa, styles.column]}>
                  {entry.cliente}
                </Text>
                <Text style={[styles.datosEmpresa, styles.column]}>
                  {entry.planta}
                </Text>
                <Text style={[styles.datosEmpresa, styles.column]}>
                  {entry.fecha}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  touchable: {
    margin: 8,
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 20,
  },
  empresaContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 20, // Ajusta el espacio para evitar solapamientos
    paddingVertical: 16,
    backgroundColor: "#fff", // Fondo visible
  },
  containerAgregar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
  spreadsheet: {
    marginTop: 20,
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Línea divisoria para las filas
  },
  headerData: {
    backgroundColor: "#f0f0f0", // Fondo diferente para el encabezado
    borderBottomWidth: 2,
    borderBottomColor: "black", // Línea más gruesa para encabezados
  },
  titledatoscajas: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
  datoscajas: {
    fontSize: 10,
    textAlign: "center",
  },
  column: {
    flex: 1, // Cada columna ocupa la misma proporción
    textAlign: "center",
  },
});
