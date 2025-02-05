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
import { supabase } from "../../utils/database/supabaseClient";
import globalStyles from "../../utils/styles/globalStyles";

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
      <View style={globalStyles.container}>
        <Text style={{ color: "white" }}>Cargando clientes...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={globalStyles.form}>
        {/* Tarjeta para el Dropdown de Cliente */}
        <Text style={globalStyles.title}>Cliente</Text>
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
            style={globalStyles.dropdown}
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
            style={globalStyles.dropdown}
            disable={fieldsDisabled}
          />
        </View>

        {/* Tarjeta para la fecha */}
        <View>
          <TextInput
            style={globalStyles.input}
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

        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity style={globalStyles.saveButton} onPress={handleAdd}>
            <Text style={globalStyles.buttonText}>Añadir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={globalStyles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={globalStyles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Mostrar los registros (sin cambios en esta parte) */}
      {clienteData.length > 0 && (
        <View style={globalStyles.spreadsheet}>
          <View style={globalStyles.headerData}>
            <Text style={globalStyles.headerText}>Cliente</Text>
            <Text style={globalStyles.headerText}>Planta</Text>
            <Text style={globalStyles.headerText}>Fecha</Text>
          </View>
          {clienteData.map((entry, index) => (
            <View style={globalStyles.containerData} key={index}>
              <Text style={globalStyles.column}>{entry.cliente}</Text>
              <Text style={globalStyles.column}>{entry.planta}</Text>
              <Text style={globalStyles.column}>{entry.fecha}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
