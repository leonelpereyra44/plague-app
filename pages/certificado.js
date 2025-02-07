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
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import * as Sharing from "expo-sharing";
import globalStyles from "../utils/styles/globalStyles";
import { Dropdown } from "react-native-element-dropdown";
import { supabase } from "../utils/database/supabaseClient";
import { Asset } from "expo-asset";

export default function Certificado() {
  // Precargar imagenes
  useEffect(() => {
    async function preloadImages() {
      await Asset.loadAsync([
        require("../assets/sellomariano.jpeg"),
        require("../assets/selloagustin.jpeg"),
        require("../assets/logoredondo.png"),
      ]);
    }
    preloadImages();
  }, []);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [plantas, setPlantas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firmaBase64, setFirmaBase64] = useState(null);
  const [logoBase64, setLogoBase64] = useState(null);

  const aplicadores = [
    {
      id: "mariano",
      nombre: "Pereyra Mariano",
      firma: require("../assets/sellomariano.jpeg"),
    },
    {
      id: "agustin",
      nombre: "Pereyra Agustín",
      firma: require("../assets/selloagustin.jpeg"),
    },
  ];

  const [form, setForm] = useState({
    fecha: "",
    cliente: "",
    planta: "",
    rubro: "",
    producto: "",
    principioActivo: "",
    familiaQuimica: "",
    dosis: "",
  });

  useEffect(() => {
    async function cargarLogo() {
      try {
        const [asset] = await Asset.loadAsync(
          require("../assets/logoredondo.png"),
        );
        const fileUri = `${FileSystem.documentDirectory}${asset.name}`;
        await FileSystem.copyAsync({ from: asset.localUri, to: fileUri });
        const result = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setLogoBase64(result);
      } catch (error) {
        console.error("Error al cargar el logo:", error);
      }
    }
    cargarLogo();
  }, []);

  const cargarFirma = async (firmaRuta) => {
    try {
      const [asset] = await Asset.loadAsync(firmaRuta);
      const fileUri = `${FileSystem.documentDirectory}${asset.name}`;

      // Copiar la imagen a un directorio accesible
      await FileSystem.copyAsync({ from: asset.localUri, to: fileUri });

      const result = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setFirmaBase64(result);
    } catch (error) {
      console.error("Error al cargar la firma en producción:", error);
    }
  };

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
    // Guardamos el ID del cliente
    setForm((prevForm) => ({ ...prevForm, cliente: value, planta: "" }));

    let { data, error } = await supabase
      .from("plantas")
      .select("id, nombre")
      .eq("cliente_id", value);

    if (!error) {
      setPlantas(data);

      // Después de obtener los clientes, buscamos el nombre del cliente seleccionado
      const clienteSeleccionado = clientes.find(
        (cliente) => cliente.id === value,
      );
      setForm((prevForm) => ({
        ...prevForm,
        clienteNombre: clienteSeleccionado ? clienteSeleccionado.nombre : "", // Si se encuentra, guardamos el nombre
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

  const handleProductoChange = (value) => {
    const productoSeleccionado = productos.find((p) => p.id === value);

    if (productoSeleccionado) {
      setForm((prevForm) => ({
        ...prevForm,
        producto: productoSeleccionado.id, // Guarda el ID en el estado
        productoNombre: productoSeleccionado.nombre, // Guarda el nombre para mostrarlo en la UI
        principioActivo: productoSeleccionado.principio_activo,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        producto: "",
        productoNombre: "",
        principioActivo: "",
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

  const handleAplicadorChange = async (value) => {
    const aplicadorSeleccionado = aplicadores.find((a) => a.id === value);
    if (aplicadorSeleccionado) {
      setForm((prevForm) => ({
        ...prevForm,
        aplicador: aplicadorSeleccionado.id, // Guarda el id, no el nombre
      }));

      // Cargar la firma en Base64
      await cargarFirma(aplicadorSeleccionado.firma);
    }
  };

  const generatePDF = async () => {
    if (!firmaBase64) {
      Alert.alert("Error", "La firma aún no se ha cargado correctamente.");
      return;
    }

    const html = `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; font-size: 22px; margin: 0; }
        p { font-size: 14px; text-align: justify; }
        strong { font-weight: bold; }
        .firma img {
          width: auto;
          max-width: 200px; /* Tamaño máximo deseado */
          height: auto;
          display: block; /* Hace que la imagen se comporte como un bloque */
          margin: 0 auto; /* Centra la imagen */
        }
        .datos { margin-top: 20px; font-size: 14px; }
        img { width: 50px; height: 50px; margin-right: 10px; }
        .header { 
          display: flex; 
          flex-direction: column; /* Alinea logo y título en columna */
          align-items: center; /* Centra ambos elementos horizontalmente */
          justify-content: center; /* Centra los elementos verticalmente */
        }
        .header h1 { 
          margin-top: 10px; /* Añade margen superior al título para separarlo del logo */
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="data:image/png;base64,${logoBase64}" />
        <h1>Certificado de Saneamiento</h1>
      </div>
      <p>En Chacabuco, a los <strong>${form.fecha}</strong>, en el inmueble ubicado en la ciudad, donde funcionan las instalaciones de la empresa <strong>${form.clienteNombre}</strong> en la planta <strong>${form.planta}</strong>, dedicada al rubro <strong>${form.rubro}</strong>.</p>
      <div class="datos">
        <p><strong>Producto:</strong> ${form.productoNombre}</p>
        <p><strong>Ingrediente Activo:</strong> ${form.principioActivo}</p>
        <p><strong>Familia Química:</strong> ${form.familiaQuimica}</p>
        <p><strong>Dosis:</strong> ${form.dosis}</p>
      </div>
      <div class="firma">
        <img src="data:image/jpeg;base64,${firmaBase64}" />
      </div>
    </body>
  </html>
`;

    try {
      const sanitizedFileName =
        `Certificado-de-Saneamiento-${form.clienteNombre}-${form.planta}-${form.fecha}`
          .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
          .replace(/[^a-zA-Z0-9-_]/g, ""); // Elimina caracteres especiales

      const fileName = `${sanitizedFileName}.pdf`; // Asegura la extensión correcta

      const { uri } = await Print.printToFileAsync({ html });

      const newUri = `${FileSystem.documentDirectory}${fileName}`;

      // Asegurarse de que el archivo tenga extensión PDF al moverlo
      await FileSystem.copyAsync({
        from: uri,
        to: newUri,
      });

      await Sharing.shareAsync(newUri);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
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
        value={form.producto} // Ahora guarda el ID, así el Dropdown selecciona correctamente
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
      <Text>Aplicador:</Text>
      <Dropdown
        data={aplicadores}
        labelField="nombre"
        valueField="id"
        value={form.aplicador}
        onChange={(item) => handleAplicadorChange(item.id)}
        style={globalStyles.dropdown}
      />
      <Button title="Generar PDF" onPress={generatePDF} />
    </ScrollView>
  );
}
