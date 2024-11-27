import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Voladores from "../utils/voladores"; // Importamos el componente Voladores
import Caminadores from "../utils/caminadores"; // Importamos el componente Caminadores
import Roedores from "../utils/roedores"; // Importamos el componente Roedores
import ProductosRoedores from "../utils/productosRoedores"; // Importamos el componente ProductosRoedores
import Empresa from "../utils/empresa"; // Importamos el componente Empresa

export default function GenerarPlanilla() {
  const insets = useSafeAreaInsets();

  const [showVoladores, setShowVoladores] = useState(false);
  const [voladoresData, setVoladoresData] = useState([]); // Estado para manejar los datos de los voladores
  //Estados para manejar los caminadores
  const [showCaminadores, setShowCaminadores] = useState(false); // Estado para mostrar u ocultar los caminadores
  const [caminadoresData, setCaminadoresData] = useState([]); // Estado para manejar los datos de los caminadores
  //Estados para manejar los roedores
  const [showRoedores, setShowRoedores] = useState(false); // Estado para mostrar u ocultar los roedores
  const [roedoresData, setRoedoresData] = useState([]); // Estado para manejar los datos de los roedores
  //Estados para manejar los productos de los roedores
  const [showProductosRoedores, setShowProductosRoedores] = useState(false); // Estado para mostrar u ocultar los productos de los roedores
  const [productosRoedoresData, setProductosRoedoresData] = useState([]); // Estado para manejar los datos de los productos de los roedores
  //Estados para manejar datos de la empresa
  const [showEmpresa, setShowEmpresa] = useState(false); // Estado para mostrar u ocultar los datos de la empresa
  const [empresaData, setEmpresaData] = useState([]); // Estado para manejar los datos de la empresa
  
  const [titulo, setTitulo] = useState("Nueva Planilla"); // Estado para manejar el título de la planilla
  //Función para mostrar u ocultar los voladores
  const DesplegarVoladores = () => {
    setShowVoladores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los voladores
    setShowCaminadores(false); // Ocultar los caminadores cuando se despliegan los voladores
    setShowRoedores(false);
    setShowProductosRoedores(false);
    setShowEmpresa(false);

    setTitulo("Voladores");
  };
  //Función para mostrar u ocultar los caminadores
  const DesplegarCaminadores = () => {
    setShowCaminadores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los caminadores
    setShowVoladores(false);
    setShowRoedores(false);
    setShowProductosRoedores(false);
    setShowEmpresa(false);

    setTitulo("Caminadores");
  };
  //Función para mostrar u ocultar los roedores
  const DesplegarRoedores = () => {
    setShowRoedores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los roedores
    setShowCaminadores(false);
    setShowVoladores(false);
    setShowProductosRoedores(false);
    setShowEmpresa(false);
    setTitulo("Roedores");
  };
  //Función para mostrar u ocultar los productos de los roedores
  const DesplegarProductosRoedores = () => {
    setShowProductosRoedores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los productos de los roedores
    setShowCaminadores(false);
    setShowVoladores(false);
    setShowRoedores(false);
    setShowEmpresa(false);
    setTitulo("Productos Roedores");
  };
  //Función para mostrar u ocultar los datos de la empresa
  const DesplegarEmpresa = () => {
    setShowEmpresa((prev) => !prev); // Cambiar el estado de mostrar u ocultar los datos de la empresa
    setShowCaminadores(false);
    setShowVoladores(false);
    setShowRoedores(false);
    setShowProductosRoedores(false);
    setTitulo("Datos del Cliente");
  };

  return (
    <ScrollView>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={[styles.titulo]}>{titulo}</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={styles.touchable}
              onPress={DesplegarEmpresa}
            >
              <Text style={styles.textTouchable}>Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchable}
              onPress={DesplegarVoladores}
            >
              <Text style={styles.textTouchable}>Voladores</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchable}
              onPress={DesplegarCaminadores}
            >
              <Text style={styles.textTouchable}>Caminadores</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchable}
              onPress={DesplegarRoedores}
            >
              <Text style={styles.textTouchable}>Roedores</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchable}
              onPress={DesplegarProductosRoedores}
            >
              <Text style={styles.textTouchable}>Productos</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Mostrar u ocultar los datos de la empresa */}
        {showEmpresa && (
          <Empresa
            onClose={() => setShowEmpresa(false)}
            empresaData={empresaData}
            setEmpresaData={setEmpresaData}
          />
        )}
        {/* Mostrar u ocultar los voladores */}
        {showVoladores && (
          <Voladores
            onClose={() => setShowVoladores(false)}
            voladoresData={voladoresData}
            setVoladoresData={setVoladoresData}
          />
        )}
        {/* Mostrar u ocultar los caminadores */}
        {showCaminadores && (
          <Caminadores
            onClose={() => setShowCaminadores(false)}
            caminadoresData={caminadoresData}
            setCaminadoresData={setCaminadoresData}
          />
        )}
        {/* Mostrar u ocultar los roedores */}
        {showRoedores && (
          <Roedores
            onClose={() => setShowRoedores(false)}
            roedoresData={roedoresData}
            setRoedoresData={setRoedoresData}
          />
        )}
        {/* Mostrar u ocultar los productos de los roedores */}
        {showProductosRoedores && (
          <ProductosRoedores
            onClose={() => setShowProductosRoedores(false)}
            productosRoedoresData={productosRoedoresData}
            setProductosRoedoresData={setProductosRoedoresData}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  touchable: {
    marginHorizontal: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
  },
  textTouchable: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
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
    padding: 10,
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Línea divisoria para las filas
  },
  column: {
    flex: 1, // Cada columna ocupa la misma proporción
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
});
