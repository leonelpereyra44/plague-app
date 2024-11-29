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
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing"; // Para compartir el archivo

const exportToExcel = async () => {
  try {
    // Datos que se incluirán en el archivo
    const secciones = [
      { titulo: "Empresa", data: empresaData },
      { titulo: "Productos Roedores", data: productosRoedoresData },
      { titulo: "Roedores", data: roedoresData },
      { titulo: "Caminadores", data: caminadoresData },
      { titulo: "Voladores", data: voladoresData },
    ];

    // Obtener todas las claves únicas (encabezados de columna)
    const todasLasClaves = secciones.reduce((claves, seccion) => {
      const clavesSeccion =
        seccion.data.length > 0 ? Object.keys(seccion.data[0]) : [];
      return [...new Set([...claves, ...clavesSeccion])];
    }, []);

    // Inicializar contenido de la hoja
    let hoja = [];

    // Procesar cada sección
    secciones.forEach((seccion) => {
      // Agregar título de sección
      hoja.push([seccion.titulo]); // Título en una fila
      // Agregar encabezados (claves)
      hoja.push(todasLasClaves);
      // Agregar datos de la sección
      seccion.data.forEach((fila) => {
        const filaOrdenada = todasLasClaves.map((clave) => fila[clave] || "");
        hoja.push(filaOrdenada);
      });
      // Fila vacía entre secciones
      hoja.push([]);
    });

    // Crear libro de trabajo y agregar la hoja
    const worksheet = XLSX.utils.json_to_sheet(hoja);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Planilla");

    // Convertir el libro a formato binario
    const binaryWorkbook = XLSX.write(workbook, {
      type: "base64",
      bookType: "xlsx",
    });

    // Crear un archivo temporal en el dispositivo
    const path = FileSystem.cacheDirectory + "planilla.xlsx";
    await FileSystem.writeAsStringAsync(path, binaryWorkbook, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Compartir el archivo generado
    await Sharing.shareAsync(path, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "Compartir Planilla",
      UTI: "com.microsoft.excel.xlsx",
    });
  } catch (error) {
    console.error("Error al exportar la planilla:", error);
  }
};
