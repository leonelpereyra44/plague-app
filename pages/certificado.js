import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Certificado() {
  // Precargar imagenes
  useEffect(() => {
    async function preloadImages() {
      await Asset.loadAsync([
        require("../assets/sellomariano2.png"),
        require("../assets/selloagustin2.png"),
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
      firma: require("../assets/sellomariano2.png"),
    },
    {
      id: "agustin",
      nombre: "Pereyra Agustín",
      firma: require("../assets/selloagustin2.png"),
    },
  ];

  // PENDIENTE: Agregar el tipo de fumigación en el texto
  // termo-fumigacion moto-fumigacion aspercion-manual sanitizacion

  const trabajo = [
    { label: "Termo-Fumigación", value: "Termo-Fumigación" },
    { label: "Moto-Fumigación", value: "Moto-Fumigación" },
    { label: "Asperción-Manual", value: "Asperción Manual" },
    { label: "Sanitización", value: "Sanitización" },
  ];

  const [form, setForm] = useState({
    fecha: "",
    ciudad: "",
    cliente: "",
    planta: "",
    direccion: "",
    rubro: "",
    area: "",
    sector: "",
    tipoTrabajo: "",
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
      const day = selectedDate.getDate();
      const year = selectedDate.getFullYear();

      // Array de meses en español
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const month = meses[selectedDate.getMonth()];

      // Formatear la fecha como "a los 28 días de enero del 2025"
      const fechaFormateada = `a los ${day} días de ${month} del ${year}`;

      setForm({
        ...form,
        fecha: fechaFormateada,
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
      console.log(require("../assets/sellomariano2.png"));
      console.log(require("../assets/selloagustin2.png"));
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
        body {
          font-family: 'Georgia', serif;
          padding: 40px;
          margin: 40px;
          line-height: 1.4;
          border: 2px solid #2c3e50;
          background-color: #f4f6f9;
          position: relative;
          overflow: hidden;
        }
  
        .header {
          text-align: center;
          padding-bottom: 0px;
          margin-bottom: 5px;
          border-bottom: 1px solid #2c3e50;
        }

        .logo-nombre {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .logo-nombre img {
          width: 50px;
          height: auto;
        }

        .logo-nombre h1 {
          font-size: 22px;
          color: #2c3e50;
          margin: 0;
        }

        .habilitacion {
          margin-top: 5px;
          color: #2c3e50;
        }

        .title {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          color: #2c3e50;
          text-decoration: underline;
          margin-top: 15px;
          margin-bottom: 15px;
        }
  
        p {
          font-size: 12px;
          text-align: justify;
          color: #2c3e50;
          margin: 5px 0;
        }
  
        .datos {
          margin-top: 10px;
          font-size: 12px;
          border: 1px solid #bdc3c7;
          padding: 8px;
          background-color: #ecf0f1;
          border-radius: 5px;
        }
  
        .datos p {
          margin: 3px 0;
        }
  
        .firma {
          text-align: center;
          margin-top: 15px;
        }
  
        .firma img {
          width: auto;
          max-width: 150px;
          height: auto;
          display: block;
          margin: 0 auto;
          border-top: 1px solid #7f8c8d;
          padding-top: 5px;
          margin-top: 10px;
        }
  
        .contact {
          color: #34495e;
          font-size: 14px;
          text-align: center;
          margin: 5px 0;
        }
        
        .contact span {
          font-weight: bold;
          color: #2c3e50;
        }
        
        .contact a {
          color: #2980b9;
          text-decoration: none;
        }
        
        .contact a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo-nombre">
          <img src="data:image/png;base64,${logoBase64}" />
          <h1>SAN AGUSTÍN CIP</h1>
        </div>
        <h4 class="habilitacion">Habilitación Provincial: Nº 233/15 - 1257/22</h4>
      </div>
  
      <div class="title">CERTIFICADO DE SANEAMIENTO</div>
  
      <p>En <strong>${form.ciudad}</strong>, <strong>${form.fecha}</strong>, en el inmueble ubicado en la ciudad, donde funcionan las instalaciones de la empresa <strong>${form.clienteNombre}</strong> en la planta <strong>${form.planta}</strong> ubicada en la dirección <strong>${form.direccion}</strong>, dedicada al rubro <strong>${form.rubro}</strong>.</p>
  
      <p>Certifico mediante la presente, que la empresa antes mencionada realizó los trabajos de <strong>${form.tipoTrabajo}</strong>, en el área de <strong>${form.area}</strong> (Sector: <strong>${form.sector}</strong>), utilizando un producto aprobado por SENASA para dicho establecimiento.</p>
  
      <div class="datos">
        <p><strong>Producto:</strong> ${form.productoNombre}</p>
        <p><strong>Ingrediente Activo:</strong> ${form.principioActivo}</p>
        <p><strong>Familia Química:</strong> ${form.familiaQuimica}</p>
        <p><strong>Dosis:</strong> ${form.dosis}</p>
      </div>
  
      <div class="firma">
        <img src="data:image/jpeg;base64,${firmaBase64}" alt="Firma del Aplicador" />
      </div>
  
      <div class="contact">
        <p><span>Teléfono:</span> 02352-464489 - 02364-419280</p>
        <p><span>Dirección:</span> Quintana 190, Chacabuco, Prov. Buenos Aires, Argentina</p>
        <p><span>e-mail:</span> san.agustin.cip@hotmail.com</p>
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
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          { flexGrow: 1 },
          { backgroundColor: "#1b3b4f" },
          { padding: 10 },
        ]}
      >
        <View style={globalStyles.form}>
          <Text style={globalStyles.title}>Certificado de Saneamiento</Text>
          <Text>Complete los datos para generar el certificado:</Text>
          {/* <Text>Fecha:</Text> */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              value={form.fecha}
              placeholder="Fecha:"
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
          {/* <Text>Ciudad:</Text> */}
          <TextInput
            value={form.ciudad}
            placeholder="Ciudad:"
            editable={true}
            style={globalStyles.input}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, ciudad: text }))
            }
          />
          {/* <Text>Nombre del Cliente:</Text> */}
          <Dropdown
            data={clientes}
            labelField="nombre"
            valueField="id"
            placeholder="Cliente"
            value={form.cliente}
            onChange={(item) => handleClienteChange(item.id)}
            style={globalStyles.dropdown}
          />
          {/* <Text>Planta/Sucursal:</Text> */}
          <Dropdown
            data={plantas}
            labelField="nombre"
            valueField="id"
            placeholder="Planta"
            value={plantas.find((p) => p.nombre === form.planta)?.id || ""} // Encuentra el ID de la planta seleccionada
            onChange={(item) => handlePlantaChange(item.id)}
            style={globalStyles.dropdown}
          />
          {/* <Text>Dirección:</Text> */}
          <TextInput
            value={form.direccion}
            placeholder="Dirección:"
            editable={true}
            style={globalStyles.input}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, direccion: text }))
            }
          />
          {/* <Text>Rubro:</Text> */}
          <TextInput
            value={form.rubro}
            placeholder="Rubro:"
            editable={true}
            style={globalStyles.input}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, rubro: text }))
            }
          />
          {/* <Text>Área:</Text> */}
          <TextInput
            value={form.area}
            placeholder="Área:"
            editable={true}
            style={globalStyles.input}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, area: text }))
            }
          />

          {/* <Text>Sector:</Text> */}
          <TextInput
            value={form.sector}
            placeholder="Sector:"
            editable={true}
            style={globalStyles.input}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, sector: text }))
            }
          />
          {/* <Text>Tipo de Trabajo:</Text> */}
          <Dropdown
            data={trabajo}
            labelField="label"
            valueField="value"
            placeholder="Tipo de Trabajo"
            value={form.tipoTrabajo}
            onChange={(item) =>
              setForm((prevForm) => ({ ...prevForm, tipoTrabajo: item.value }))
            }
            style={globalStyles.dropdown}
          />

          {/* <Text>Producto Usado:</Text> */}
          <Dropdown
            data={productos}
            labelField="nombre"
            valueField="id"
            placeholder="Producto"
            value={form.producto} // Ahora guarda el ID, así el Dropdown selecciona correctamente
            onChange={(item) => handleProductoChange(item.id)}
            style={globalStyles.dropdown}
          />

          {/* <Text>Principio Activo:</Text> */}
          <TextInput
            value={form.principioActivo}
            placeholder="Principio Activo:"
            editable={false}
            style={globalStyles.input}
          />
          {/* <Text>Familia Química:</Text> */}
          <TextInput
            value={form.familiaQuimica}
            placeholder="Familia Química:"
            editable={true}
            style={globalStyles.input}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, familiaQuimica: text }))
            }
          />
          {/* <Text>Dosis:</Text> */}
          <TextInput
            value={form.dosis}
            placeholder="Dosis:"
            editable={true}
            style={globalStyles.input}
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, dosis: text }))
            }
          />
          {/* <Text>Aplicador:</Text> */}
          <Dropdown
            data={aplicadores}
            labelField="nombre"
            valueField="id"
            placeholder="Aplicador"
            value={form.aplicador}
            onChange={(item) => handleAplicadorChange(item.id)}
            style={globalStyles.dropdown}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={[{ padding: 10 }, { backgroundColor: "#1b3b4f" }]}>
        <Button title="Generar PDF" onPress={generatePDF} />
      </View>
    </>
  );
}
