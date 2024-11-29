import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Exportar({
  onClose,
  empresaData,
  productosRoedoresData,
  roedoresData,
  caminadoresData,
  voladoresData,
}) {
  // Definir las secciones de datos
  const dataSections = [
    { title: "Empresa", data: empresaData || [] },
    { title: "Productos Roedores", data: productosRoedoresData || [] },
    { title: "Roedores", data: roedoresData || [] },
    { title: "Caminadores", data: caminadoresData || [] },
    { title: "Voladores", data: voladoresData || [] },
  ];

  // Si no hay datos en ninguna sección, mostrar mensaje
  const isEmpty = dataSections.every((section) => section.data.length === 0);

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No hay datos disponibles.</Text>
        <TouchableOpacity style={styles.touchable} onPress={onClose}>
          <Text style={styles.text}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Datos Consolidados</Text>

        {dataSections.map(({ title, data }, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            {/* Título de la sección */}
            <Text style={styles.sectionTitle}>{title}</Text>

            {/* Obtener todas las claves únicas para esta sección */}
            {data.length > 0 && (
              <>
                <View style={[styles.containerData, styles.headerData]}>
                  {Object.keys(data[0]).map((column, colIndex) => (
                    <Text
                      key={colIndex}
                      style={[styles.titledatoscajas, styles.column]}
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}{" "}
                    </Text>
                  ))}
                </View>
                {/* Filas de datos */}
                {data.map((entry, rowIndex) => (
                  <View style={styles.containerData} key={rowIndex}>
                    {Object.keys(entry).map((column, colIndex) => (
                      <Text
                        key={colIndex}
                        style={[styles.datoscajas, styles.column]}
                      >
                        {entry[column] ?? "-"}
                      </Text>
                    ))}
                  </View>
                ))}
              </>
            )}

            {/* Mensaje si no hay datos en esta sección */}
            {data.length === 0 && (
              <Text style={styles.noDataText}>
                No hay datos en esta sección.
              </Text>
            )}
          </View>
        ))}

        {/* Botón para cerrar */}
        <TouchableOpacity style={styles.touchable} onPress={onClose}>
          <Text style={styles.text}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  containerData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerData: {
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 2,
    borderBottomColor: "black",
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
    flex: 1,
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 10,
    color: "gray",
    marginTop: 10,
  },
  touchable: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightgreen",
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    color: "black",
  },
});


