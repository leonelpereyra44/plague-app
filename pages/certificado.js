import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import globalStyles from "../utils/styles/globalStyles";
import { Dropdown } from "react-native-element-dropdown";
import { supabase } from "../utils/database/supabaseClient";

export default function Certificado() {
  const [form, setForm] = useState({
    fecha: "",
    cliente: "",
    planta: "",
    rubro: "",
    producto: "",
    principioActivo: "",
    familiaQuimica: "",
    dosis: "",
    firma: "Firma del Aplicador",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [plantas, setPlantas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProductos();
  }, []);

  async function fetchProductos() {
    setLoading(true);
    const { data, error } = await supabase
      .from("productos")
      .select("id, nombre, tipo, principio_activo, laboratorio, certificado");

    if (error) {
      Alert.alert(
        "Error",
        "No se pudieron cargar los productos: " + error.message,
      );
    } else {
      setProductos(data || []);
    }
    setLoading(false);
  }

  const handleClienteChange = async (value) => {
    setForm((prevForm) => ({ ...prevForm, cliente: value, planta: "" }));

    let { data, error } = await supabase
      .from("plantas")
      .select("id, nombre")
      .eq("cliente_id", value);

    if (!error) {
      setPlantas(data);
      setForm((prevForm) => ({
        ...prevForm,
        planta: data.length > 0 ? data[0].nombre : "", // Guarda el nombre de la primera planta
      }));
    }
  };

  const handlePlantaChange = (value) => {
    const plantaSeleccionada = plantas.find((p) => p.id === value);
    setForm((prevForm) => ({
      ...prevForm,
      planta: plantaSeleccionada?.nombre || "", // Guarda el nombre de la planta
    }));
  };

  const handleProductoChange = async (value) => {
    const productoSeleccionado = productos.find((p) => p.id === value);

    let { data, error } = await supabase
      .from("productos")
      .select("principio_activo")
      .eq("id", value);

    if (!error && data.length > 0) {
      setForm((prevForm) => ({
        ...prevForm,
        producto: productoSeleccionado?.nombre || "", // Guarda el nombre
        principioActivo: data[0].principio_activo,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        producto: productoSeleccionado?.nombre || "", // Guarda el nombre
      }));
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setForm({
        ...form,
        fecha: selectedDate.toLocaleDateString("es-ES", options),
      });
    }
  };

  const generatePDF = async () => {
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; font-size: 22px; }
            p { font-size: 14px; text-align: justify; }
            strong { font-weight: bold; }
            .firma { text-align: center; margin-top: 40px; font-style: italic; }
            .datos { margin-top: 20px; font-size: 14px; }
          </style>
        </head>
        <body>
          <h1>Certificado de Saneamiento</h1>
          <p>En Chacabuco, a los <strong>${form.fecha}</strong>, en el inmueble ubicado en la ciudad, donde funcionan las instalaciones de la empresa <strong>${form.cliente}</strong> en la planta <strong>${form.planta}</strong>, dedicada al rubro <strong>${form.rubro}</strong>.</p>
          <p>Certifico mediante la presente que la empresa realizó los trabajos de termo-fumigación utilizando un producto aprobado por SENASA.</p>
          <div class="datos">
            <p><strong>Producto:</strong> ${form.producto}</p>
            <p><strong>Ingrediente Activo:</strong> ${form.principioActivo}</p>
            <p><strong>Familia Química:</strong> ${form.familiaQuimica}</p>
            <p><strong>Dosis:</strong> ${form.dosis}</p>
          </div>
          <div class="firma">
            <p>----------------------------------------------</p>
            <p>${form.firma}</p>
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Fecha:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          value={form.fecha}
          editable={false}
          style={globalStyles.input}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Text>Nombre del Cliente:</Text>
      <Dropdown
        data={clientes}
        labelField="nombre"
        valueField="id"
        value={form.cliente}
        onChange={(item) => handleClienteChange(item.id)}
        style={globalStyles.dropdown}
      />
      <Text>Planta/Sucursal:</Text>
      <Dropdown
        data={plantas}
        labelField="nombre"
        valueField="id"
        value={plantas.find((p) => p.nombre === form.planta)?.id || ""} // Encuentra el ID de la planta seleccionada
        onChange={(item) => handlePlantaChange(item.id)}
        style={globalStyles.dropdown}
      />

      <Text>Producto Usado:</Text>
      <Dropdown
        data={productos}
        labelField="nombre"
        valueField="id"
        value={form.producto}
        onChange={(item) => handleProductoChange(item.id)}
        style={globalStyles.dropdown}
      />
      <Text>Principio Activo:</Text>
      <TextInput
        value={form.principioActivo}
        editable={false}
        style={globalStyles.input}
      />
      <Text>Familia Química:</Text>
      <TextInput
        value={form.familiaQuimica}
        editable={true}
        style={globalStyles.input}
        onChangeText={(text) =>
          setForm((prevForm) => ({ ...prevForm, familiaQuimica: text }))
        }
      />
      <Text>Dosis:</Text>
      <TextInput
        value={form.dosis}
        editable={true}
        style={globalStyles.input}
        onChangeText={(text) =>
          setForm((prevForm) => ({ ...prevForm, dosis: text }))
        }
      />

      <Button title="Generar PDF" onPress={generatePDF} />
    </ScrollView>
  );
}
