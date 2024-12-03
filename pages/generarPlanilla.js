import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Voladores from "../utils/voladores"; // Importamos el componente Voladores
import Caminadores from "../utils/caminadores"; // Importamos el componente Caminadores
import Roedores from "../utils/roedores"; // Importamos el componente Roedores
import ProductosRoedores from "../utils/productosRoedores"; // Importamos el componente ProductosRoedores
import Empresa from "../utils/empresa"; // Importamos el componente Empresa
import Exportar from "../utils/exportar"; // Importamos el componente Exportar

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
  //Estados para manejar la exportación a Excel
  const [showExportar, setShowExportar] = useState(false); // Estado para mostrar u ocultar los datos de la empresa
  const [exportarData, setExportarData] = useState([]); // Estado para manejar los datos de la empresa
  //Estados para manejar los datos del usuario
  const [showUsuario, setShowUsuario] = useState(false); // Estado para mostrar u ocultar los datos de la empresa
  const [usuarioData, setUsuarioData] = useState([]); // Estado para manejar los datos de los usuarios

  const [titulo, setTitulo] = useState("Nueva Planilla"); // Estado para manejar el título de la planilla

  //Función para mostrar u ocultar los voladores
  const DesplegarVoladores = () => {
    setShowVoladores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los voladores
    setShowCaminadores(false); // Ocultar los caminadores cuando se despliegan los voladores
    setShowRoedores(false);
    setShowProductosRoedores(false);
    setShowEmpresa(false);
    setShowExportar(false);
    setShowUsuario(false);
    setTitulo("Voladores");
  };
  //Función para mostrar u ocultar los caminadores
  const DesplegarCaminadores = () => {
    setShowCaminadores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los caminadores
    setShowVoladores(false);
    setShowRoedores(false);
    setShowProductosRoedores(false);
    setShowEmpresa(false);
    setShowExportar(false);
    setShowUsuario(false);
    setTitulo("Caminadores");
  };
  //Función para mostrar u ocultar los roedores
  const DesplegarRoedores = () => {
    setShowRoedores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los roedores
    setShowCaminadores(false);
    setShowVoladores(false);
    setShowProductosRoedores(false);
    setShowEmpresa(false);
    setShowExportar(false);
    setShowUsuario(false);
    setTitulo("Roedores");
  };
  //Función para mostrar u ocultar los productos de los roedores
  const DesplegarProductosRoedores = () => {
    setShowProductosRoedores((prev) => !prev); // Cambiar el estado de mostrar u ocultar los productos de los roedores
    setShowCaminadores(false);
    setShowVoladores(false);
    setShowRoedores(false);
    setShowEmpresa(false);
    setShowExportar(false);
    setShowUsuario(false);
    setTitulo("Productos Roedores");
  };
  //Función para mostrar u ocultar los datos de la empresa
  const DesplegarEmpresa = () => {
    setShowEmpresa((prev) => !prev); // Cambiar el estado de mostrar u ocultar los datos de la empresa
    setShowCaminadores(false);
    setShowVoladores(false);
    setShowRoedores(false);
    setShowProductosRoedores(false);
    setShowExportar(false);
    setShowUsuario(false);
    setTitulo("Cliente");
  };

  const DesplegarExportar = () => {
    setShowExportar((prev) => !prev); // Cambiar el estado de mostrar u ocultar los datos de la empresa
    setShowEmpresa(false);
    setShowCaminadores(false);
    setShowVoladores(false);
    setShowRoedores(false);
    setShowProductosRoedores(false);
    setShowUsuario(false);
    setTitulo("Planilla");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
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
              <TouchableOpacity
                style={styles.touchable}
                onPress={DesplegarExportar}
              >
                <Text style={styles.textTouchable}>Exportar a Excel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {/* Mostrar u ocultar los datos de la empresa */}
          {showEmpresa && (
            <Empresa
              onClose={() => setShowEmpresa(false)}
              empresaData={empresaData}
              setEmpresaData={setEmpresaData} />
          )}
          {/* Mostrar u ocultar los voladores */}
          {showVoladores && (
            <Voladores
              onClose={() => setShowVoladores(false)}
              voladoresData={voladoresData}
              setVoladoresData={setVoladoresData} />
          )}
          {/* Mostrar u ocultar los caminadores */}
          {showCaminadores && (
            <Caminadores
              onClose={() => setShowCaminadores(false)}
              caminadoresData={caminadoresData}
              setCaminadoresData={setCaminadoresData} />
          )}
          {/* Mostrar u ocultar los roedores */}
          {showRoedores && (
            <Roedores
              onClose={() => setShowRoedores(false)}
              roedoresData={roedoresData}
              setRoedoresData={setRoedoresData} />
          )}
          {/* Mostrar u ocultar los productos de los roedores */}
          {showProductosRoedores && (
            <ProductosRoedores
              onClose={() => setShowProductosRoedores(false)}
              productosRoedoresData={productosRoedoresData}
              setProductosRoedoresData={setProductosRoedoresData} />
          )}
          {/* Mostrar u ocultar los datos del usuario */}
          {showUsuario && (
            <Usuario
              onClose={() => setShowUsuario(false)}
              usuarioData={usuarioData}
              setUsuarioData={setUsuarioData} />
          )}
          {/* Mostrar u ocultar la exportación a Excel */}
          {showExportar && (
            <Exportar
              onClose={() => setShowExportar(false)}
              exportarData={exportarData}
              setExportarData={setExportarData}
              voladoresData={voladoresData}
              caminadoresData={caminadoresData}
              roedoresData={roedoresData}
              productosRoedoresData={productosRoedoresData}
              empresaData={empresaData}
              usuarioData={usuarioData} />
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F5F5F5", // Fondo ligeramente gris para un diseño moderno
  },
  titulo: {
    fontSize: 28, // Tamaño moderado para resaltar
    fontWeight: "bold", // Texto en negrita
    textAlign: "center", // Centramos el título
    textTransform: "uppercase", // Mayúsculas para énfasis
    color: "black", // Azul elegante
    backgroundColor: "#E8F5E9", // Fondo verde claro, que da un contraste suave
    paddingVertical: 10, // Espaciado interno vertical
    paddingHorizontal: 15, // Espaciado interno horizontal
    borderRadius: 10, // Bordes redondeados
    borderWidth: 2, // Línea del borde
    borderColor: "#1E88E5", // Verde intenso para resaltar
    marginVertical: 15, // Espaciado con otros elementos
    shadowColor: "#000", // Sombra para dar profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Elevación para Android
  },
  touchable: {
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "#007AFF", // Azul estándar de iOS
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra visible en Android
  },
  textTouchable: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  horizontalScroll: {
    marginVertical: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Más espacio entre botones
  },
});

