import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown"; // Usamos Dropdown directamente.

export default function ProductosRoedores({
  onClose,
  productosRoedoresData,
  setProductosRoedoresData,
}) {
  const productos = [
    { label: "Raticida", value: "Raticida" },
    { label: "Trampa", value: "Trampa" },
    { label: "Cebo", value: "Cebo" },
    { label: "Jaula", value: "Jaula" },
    { label: "Veneno", value: "Veneno" },
    { label: "Otro", value: "Otro" },
  ];

  const principiosActivos = [
    { label: "Bromadiolona", value: "Bromadiolona" },
    { label: "Brodifacoum", value: "Brodifacoum" },
    { label: "Difenacoum", value: "Difenacoum" },
    { label: "Difethialona", value: "Difethialona" },
    { label: "Flocoumafen", value: "Flocoumafen" },
    { label: "Warfarina", value: "Warfarina" },
    { label: "Otro", value: "Otro" },
  ];

  const laboratorios = [
    { label: "Bayer", value: "Bayer" },
    { label: "Basf", value: "Basf" },
    { label: "Syngenta", value: "Syngenta" },
    { label: "FMC", value: "FMC" },
    { label: "Otro", value: "Otro" },
  ];

  const [selectedProductoUtilizado, setSelectedProductoUtilizado] =
    useState("");
  const [selectedPrincipioActivo, setSelectedPrincipioActivo] = useState(""); // Estado para manejar el principio activo
  const [selectedLaboratorio, setSelectedLaboratorio] = useState(""); // Estado para manejar el laboratorio
  const [selectedCertificado, setSelectedCertificado] = useState(""); // Estado para manejar el número de certificado

  const LimpiarProductos = () => {
    setSelectedProductoUtilizado("");
    setSelectedPrincipioActivo("");
    setSelectedLaboratorio("");
    setSelectedCertificado("");
  };
  return (
    <ScrollView>
      <View style={styles.productosContainer}>
        <Dropdown
          data={productos}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedProductoUtilizado}
          placeholder="Producto utilizado:"
          onChange={(item) => {
            setSelectedProductoUtilizado(item.value);
          }}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
        />
        <Dropdown
          data={principiosActivos}
          maxHeight={200}
          labelField="label"
          value={selectedPrincipioActivo}
          valueField="value"
          placeholder="Principio activo:"
          onChange={(item) => setSelectedPrincipioActivo(item.value)}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
        />
        <Dropdown
          data={laboratorios}
          maxHeight={200}
          labelField="label"
          value={selectedLaboratorio}
          valueField="value"
          placeholder="Laboratorio:"
          onChange={(item) => setSelectedLaboratorio(item.value)}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
        />
        <TextInput
          style={styles.input}
          value={selectedCertificado}
          onChangeText={setSelectedCertificado}
          placeholder="Número de lote o certificado"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            if (
              !selectedProductoUtilizado ||
              !selectedPrincipioActivo ||
              !selectedLaboratorio ||
              !selectedCertificado
            ) {
              alert("Por favor, complete todos los campos");
              return;
            } else {
              const newEntry = {
                producto: selectedProductoUtilizado,
                principioActivo: selectedPrincipioActivo,
                laboratorio: selectedLaboratorio,
                certificado: selectedCertificado,
              };
              setProductosRoedoresData((prev) => [...prev, newEntry]); // Agrega el nuevo registro
              //Resetea los campos
              LimpiarProductos();
            }
            alert("Datos guardados correctamente");
          }}
        >
          <Text>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            onClose();
            LimpiarProductos();
          }}
        >
          <Text>Cerrar</Text>
        </TouchableOpacity>
      </View>
      {productosRoedoresData.length > 0 && (
        <View style={styles.spreadsheet}>
          <View style={[styles.containerData, styles.headerData]}>
            <Text style={[styles.titledatoscajas, styles.column]}>
              Producto
            </Text>
            <Text style={[styles.titledatoscajas, styles.column]}>
              Principio Activo
            </Text>
            <Text style={[styles.titledatoscajas, styles.column]}>
              Laboratorio
            </Text>
            <Text style={[styles.titledatoscajas, styles.column]}>
              N° Lote/Certificado
            </Text>
          </View>
          {productosRoedoresData.map((entry, index) => (
            <View style={styles.containerData} key={index}>
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.producto}
              </Text>
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.principioActivo}
              </Text>
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.laboratorio}
              </Text>
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.certificado}
              </Text>
            </View>
          ))}
        </View>
      )}
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
  productosContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 20, // Ajusta el espacio para evitar solapamientos
    paddingVertical: 16,
    backgroundColor: "#fff", // Fondo visible
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
