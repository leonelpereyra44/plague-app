import React, { useState, useEffect } from "react";
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
import { supabase } from "./database/supabaseClient";

export default function Cliente({ onClose, clienteData, setClienteData }) {
  const [date, setDate] = useState(new Date()); // Estado para manejar la fecha
  const [showPicker, setShowPicker] = useState(false); // Estado para mostrar u ocultar el selector de fecha
  const [fechaDelDia, setFechaDelDia] = useState(""); // Estado para manejar la fecha en formato legible
  const [fieldsDisabled, setFieldsDisabled] = useState(false); // Estado para controlar si los campos están deshabilitados
  const [clientes, setClientes] = useState([]); // Estado para almacenar los datos de clientes desde Supabase
  const [plantas, setPlantas] = useState([]); // Estado para almacenar las plantas desde Supabase
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [selectedCliente, setSelectedCliente] = useState(""); // Cliente seleccionado
  const [selectedPlantaCliente, setSelectedPlantaCliente] = useState(""); // Planta seleccionada

  // Función para obtener los clientes desde la base de datos de Supabase
  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("clientes").select("*");
      if (error) {
        console.error("Error al obtener clientes:", error.message);
      } else {
        console.log("Clientes obtenidos:", data);
        setClientes(data); // Guardamos los datos de los clientes
      }
      setLoading(false);
    };
    fetchClientes();
  }, []);

  // Función para obtener las plantas filtradas por el cliente seleccionado
  useEffect(() => {
    if (selectedCliente) {
      const fetchPlantas = async () => {
        const { data, error } = await supabase
          .from("plantas")
          .select("*")
          .eq("cliente_id", selectedCliente); // Filtramos las plantas por cliente
        if (error) {
          console.error("Error al obtener plantas:", error.message);
        } else {
          console.log("Plantas obtenidas para el cliente:", data);
          setPlantas(data); // Guardamos las plantas filtradas
        }
      };

      fetchPlantas();
    }
  }, [selectedCliente]);

  const LimpiarCliente = () => {
    setSelectedCliente(""); // Limpia el estado local
    setSelectedPlantaCliente(""); // Limpia el estado local
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
    if (!selectedCliente || !selectedPlantaCliente || !fechaDelDia) {
      alert("Por favor, complete todos los campos antes de agregar.");
      return;
    }

    const clienteNombre = clientes.find(
      (cliente) => cliente.id === selectedCliente,
    )?.nombre;
    const plantaNombre = plantas.find(
      (planta) => planta.id === selectedPlantaCliente,
    )?.nombre;

    if (!clienteNombre || !plantaNombre) {
      alert("Error: cliente o planta inválidos.");
      return;
    }

    // Crear el nuevo registro
    const newEntry = {
      cliente: clienteNombre,
      planta: plantaNombre,
      fecha: fechaDelDia,
    };

    // Actualizar clienteData con el nuevo registro
    setClienteData((prev) => [...prev, newEntry]);
    alert("Registro agregado correctamente.");
    LimpiarCliente(); // Limpia los campos
  };

  const handleDelete = () => {
    if (clienteData.length === 0) {
      alert("No hay registros para eliminar.");
      return;
    }

    // Eliminar el último registro
    setClienteData((prev) => prev.slice(0, -1));
    alert("Último registro eliminado.");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Tarjeta para el Dropdown de Cliente */}
        <View>
          <Dropdown
            data={clientes}
            labelField="nombre"
            valueField="id"
            placeholder="Seleccione cliente"
            value={selectedCliente}
            onChange={(item) => {
              if (item?.id) {
                setSelectedCliente(item.id);
                setSelectedPlantaCliente(""); // Limpiar planta al cambiar de cliente
                console.log("Cliente seleccionado:", item.id);
              }
            }}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            disable={fieldsDisabled}
          />
        </View>

        {/* Tarjeta para el Dropdown de Planta */}
        <View>
          <Dropdown
            data={plantas}
            labelField="nombre"
            valueField="id"
            placeholder="Seleccione planta"
            value={selectedPlantaCliente}
            onChange={(item) => {
              if (item?.id) {
                setSelectedPlantaCliente(item.id);
                console.log("Planta seleccionada:", item.id);
              }
            }}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            disable={fieldsDisabled}
          />
        </View>

        {/* Tarjeta para la fecha */}
        <View>
          <TextInput
            style={styles.input}
            placeholder="Seleccione una fecha"
            value={fechaDelDia}
            onFocus={() => setShowPicker(true)} // Abre el selector de fecha al enfocar
            editable={!fieldsDisabled} // Deshabilita el campo si no se ha seleccionado el cliente
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
        </View>

        <View style={styles.containerAgregar}>
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Mostrar los registros (sin cambios en esta parte) */}
      {clienteData.length > 0 && (
        <View style={styles.spreadsheet}>
          <View style={[styles.containerData, styles.headerData]}>
            <Text style={[styles.titledatoscajas, styles.column]}>Cliente</Text>
            <Text style={[styles.titledatoscajas, styles.column]}>Planta</Text>
            <Text style={[styles.titledatoscajas, styles.column]}>Fecha</Text>
          </View>
          {clienteData.map((entry, index) => (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#1b3b4f", // Fondo similar al del logo
  },
  containerAgregar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    marginBottom: 20,
    padding: 20,
    gap: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    color: "#90A4AE",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#263238",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#B0BEC5",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#B0BEC5",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#263238",
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
