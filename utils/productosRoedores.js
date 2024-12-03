import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function ProductosRoedores({
  onClose,
  productosRoedoresData,
  setProductosRoedoresData,
}) {
  const productos = [
    {
      producto: "CEBO RATOP BLOQUES",
      principioActivo: "BROMADIOLONE",
      laboratorio: "GLEBA S.A",
      certificado: "C.S-2611 / C.A-0250006",
    },
    {
      producto: "CEBO STORM BLOQUES",
      principioActivo: "FLOCOUMAFEN",
      laboratorio: "BAFS",
      certificado: "C.S-2617 / C.A-0680003",
    },
    {
      producto: "GLEXRAT GRANO",
      principioActivo: "BROMADIOLONE",
      laboratorio: "GLEBA S.A",
      certificado: "C.S-872 / C.A-0250003",
    },
    {
      producto: "PANIC ALMENDRA BLOQUE",
      principioActivo: "BRODIFACOUM",
      laboratorio: "PANIC",
      certificado: "C.S-2334 / C.A-0250019",
    },
    {
      producto: "HUAGRO RAT PELLETS",
      principioActivo: "BROMADIOLONE",
      laboratorio: "HUAGRO",
      certificado: "C.A-0250003",
    },
    {
      producto: "PEGARAT PARA RATAS",
      principioActivo: "PEGAMENTO",
      laboratorio: "SUPRABOND",
      certificado: "NO TOXICAS",
    },
    {
      producto: "ROETRAP",
      principioActivo: "PEGAMENTO",
      laboratorio: "ECO-WORLD",
      certificado: "NO TOXICAS",
    },
  ];

  const [selectedProducto, setSelectedProducto] = useState("");
  const [selectedPrincipioActivo, setSelectedPrincipioActivo] = useState("");
  const [selectedLaboratorio, setSelectedLaboratorio] = useState("");
  const [selectedCertificado, setSelectedCertificado] = useState("");

  const LimpiarProductos = () => {
    setSelectedProducto("");
    setSelectedPrincipioActivo("");
    setSelectedLaboratorio("");
    setSelectedCertificado("");
  };

  const handleProductoChange = (item) => {
    setSelectedProducto(item.value);
    const productoSeleccionado = productos.find(
      (p) => p.producto === item.value,
    );
    if (productoSeleccionado) {
      setSelectedPrincipioActivo(productoSeleccionado.principioActivo);
      setSelectedLaboratorio(productoSeleccionado.laboratorio);
      setSelectedCertificado(productoSeleccionado.certificado);
    } else {
      LimpiarProductos();
    }
  };

  return (
    <ScrollView>
      <View style={styles.productosContainer}>
        {/* Producto */}
        <Dropdown
          data={productos.map((p) => ({
            label: p.producto,
            value: p.producto,
          }))}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedProducto}
          placeholder="Producto utilizado:"
          onChange={handleProductoChange}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />

        {/* Principio Activo */}
        <Dropdown
          data={[
            { label: selectedPrincipioActivo, value: selectedPrincipioActivo },
          ]}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedPrincipioActivo}
          placeholder="Principio activo:"
          disabled={true}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />

        {/* Laboratorio */}
        <Dropdown
          data={[{ label: selectedLaboratorio, value: selectedLaboratorio }]}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedLaboratorio}
          placeholder="Laboratorio:"
          disabled={true}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />

        {/* Certificado */}
        <Dropdown
          data={[{ label: selectedCertificado, value: selectedCertificado }]}
          maxHeight={200}
          labelField="label"
          valueField="value"
          value={selectedCertificado}
          placeholder="Certificado:"
          disabled={true}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        />
      </View>

      {/* Botones */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (
              !selectedProducto ||
              !selectedPrincipioActivo ||
              !selectedLaboratorio ||
              !selectedCertificado
            ) {
              alert("Por favor, complete todos los campos");
              return;
            }

            const newEntry = {
              Producto: selectedProducto,
              PrincipioActivo: selectedPrincipioActivo,
              Laboratorio: selectedLaboratorio,
              Certificado: selectedCertificado,
            };

            setProductosRoedoresData((prev) => [...prev, newEntry]);
            LimpiarProductos();
            alert("Datos guardados correctamente");
          }}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => {
            if (productosRoedoresData.length > 0) {
              // Eliminar el último registro de los datos
              setProductosRoedoresData((prev) => prev.slice(0, -1));
              alert("Último registro eliminado");
            } else {
              alert("No hay registros para eliminar");
            }
            LimpiarProductos();
          }}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      {/* Tabla de datos */}
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
              Certificado
            </Text>
          </View>
          {productosRoedoresData.map((entry, index) => (
            <View style={styles.containerData} key={index}>
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.Producto}
              </Text>
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.PrincipioActivo}
              </Text>
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.Laboratorio}
              </Text>
              <Text style={[styles.datoscajas, styles.column]}>
                {entry.Certificado}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productosContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
    padding: 16,
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
    fontSize: 14,
    textAlign: "center",
    color: "#FFF",
  },
  datosEmpresa: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
});
