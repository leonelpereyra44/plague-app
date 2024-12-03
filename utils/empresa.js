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
    { label: "Pellegrini", value: "Pellegrini" },
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
        Cliente: selectedEmpresa,
        Planta: selectedPlantaEmpresa,
        Fecha: fechaDelDia,
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
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => {
              if (empresaData.length > 0) {
                // Eliminar el último registro de los datos
                setEmpresaData((prev) => prev.slice(0, -1));
                alert("Último registro eliminado");
              } else {
                alert("No hay registros para eliminar");
              }
              LimpiarEmpresa();
            }}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
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
                  {entry.Cliente}
                </Text>
                <Text style={[styles.datosEmpresa, styles.column]}>
                  {entry.Planta}
                </Text>
                <Text style={[styles.datosEmpresa, styles.column]}>
                  {entry.Fecha}
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
  empresaContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
    paddingVertical: 16,
    backgroundColor: "#F5F5F5", // Fondo gris claro
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra ligera
  },
  containerAgregar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra para Android
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#28A745", // Verde para "Agregar"
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonSecondary: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#DC3545", // Rojo para "Cerrar"
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  spreadsheet: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden", // Evita que el contenido sobresalga
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#FFF",
  },
  headerData: {
    backgroundColor: "#007AFF",
    borderBottomWidth: 2,
    borderBottomColor: "#005BB5",
  },
  titledatoscajas: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    color: "#FFF",
  },
  datosEmpresa: {
    fontSize: 10,
    textAlign: "center",
    color: "#333",
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
});
