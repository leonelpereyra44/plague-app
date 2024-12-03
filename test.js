
const productos = [
  {
    producto: "CISCIN",
    principioActivo: "DELTAMETRINA",
    laboratorio: "BAYER, ENVU",
    numeroCertificado: "C.A-250056"
  },
  {
    producto: "PERFENO",
    principioActivo: "Propoxur 20 %",
    laboratorio: "CHEMOTECNICA",
    numeroCertificado: "C.A-0250030"
  },
  {
    producto: "PROTEGINAL",
    principioActivo: "Cipermetrina 20 % emul",
    laboratorio: "CHEMOTECNICA",
    numeroCertificado: "C.S- 375 / C.A- 0250010"
  },
  {
    producto: "CHEMONIL",
    principioActivo: "Fipronil 2 %",
    laboratorio: "CHEMOTECNICA",
    numeroCertificado: "C.A-0250103"
  },
  {
    producto: "DEMOLEDOR",
    principioActivo: "Betacipermetrina + Lufenuron",
    laboratorio: "CHEMOTECNICA",
    numeroCertificado: "C.S-3250 / C.A-0250101"
  },
  {
    producto: "ASI-NET",
    principioActivo: "CIPERMETRINA 5% + BUTOXIDO DE PIPERONILO 15 %",
    laboratorio: "CHEMOTECNICA",
    numeroCertificado: "C-2907"
  },
  {
    producto: "DEPE",
    principioActivo: "Permetrina 10 % (80% Hcis)",
    laboratorio: "CHEMOTECNICA",
    numeroCertificado: "C.A-0250082"
  },
  {
    producto: "K-OBIOL",
    principioActivo: "DELTAMETRINA 2,5G/100ML",
    laboratorio: "BAYER, ENVU",
    numeroCertificado: "C.S- 30.997"
  },
  {
    producto: "FENDONA 6 SC",
    principioActivo: "ALFA-CIPERMETRINA 6%",
    laboratorio: "BAYER, ENVU",
    numeroCertificado: "C.S-0566 / C.A-0270002"
  },
  {
    producto: "Formidor® CEBO",
    principioActivo: "FIPRONIL 0,003%",
    laboratorio: "BAYER, ENVU",
    numeroCertificado: "C.S-00284"
  },
  {
    producto: "GELTEK HORMIGAS",
    principioActivo: "Imidacloprid 2,15 %",
    laboratorio: "GELTEK",
    numeroCertificado: null
  },
  {
    producto: "DAST POLVO",
    principioActivo: "Deltametrina 0,2 %",
    laboratorio: "GLEBA S.A",
    numeroCertificado: "C.S- 0250016 /C.A- 0250016"
  },
  {
    producto: "FLY HUNT-ATRAP. MOSCAS",
    principioActivo: "ECOLOGICO- NO TOXICO",
    laboratorio: "FLY HUNT",
    numeroCertificado: "NO TOXICO"
  }
];

podrias adaptar mi codigo a ese objeto? me gustaria que los dropdows se autocompleten al seleccionar el producto

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

export default function Caminadores({
  onClose,
  caminadoresData,
  setCaminadoresData,
}) {
  const productoCaminadores = [
    { label: "CISLIN", value: "CISLIN" },
    { label: "PERFENO", value: "PERFENO" },
    { label: "PROTEGINAL", value: "OTEGINA" },
    { label: "CHEMONIL", value: "CHEMONIL" },
    { label: "ASI-NET", value: "ASI-NET" },
    { label: "DEPE", value: "DEPE" },
    { label: "K-OBIOL", value: "K-OBIOL" },
    { label: "FENDONA 6 SC", value: "FENDONA 6 SC" },
    { label: "Formidor® CEBO", value: "Formidor® CEBO" },
    { label: "GELTEK HORMIGAS", value: "GELTEK HORMIGAS" },
    { label: "DAST POLVO", value: "DAST POLVO" },
    { label: "FLY HUNT-ATRAP. MOSCAS", value: "FLY HUNT-ATRAP. MOSCAS" },
    { label: "Otro", value: "Otro" },
  ];

  const principioActivoCaminadores = [
    { label: "DELTAMETRINA", value: "DELTAMETRINA" },
    { label: "Propoxur 20 %", value: "Propoxur 20 %" },
    { label: "Cipermetrina 20 % emul", value: "Cipermetrina 20 % emul" },
    { label: "Fipronil 2 %", value: "Fipronil 2 %" },
    {
      label: "Betacipermetrina + Lufenuron",
      value: "Betacipermetrina + Lufenuron",
    },
    {
      label: "CIPERMETRINA 5% + BUTOXIDO DE PIPERONILO 15 %",
      value: "CIPERMETRINA 5% + BUTOXIDO DE PIPERONILO 15 %",
    },
    {
      label: "Permetrina 10 % (80% Hcis)",
      value: "Permetrina 10 % (80% Hcis)",
    },
    { label: "DELTAMETRINA 2,5G/100ML", value: "DELTAMETRINA 2,5G/100ML" },
    { label: "ALFA-CIPERMETRINA 6%", value: "ALFA-CIPERMETRINA 6%" },
    { label: "FIPRONIL 0,003%", value: "FIPRONIL 0,003%" },
    { label: "Imidacloprid 2,15%", value: "Imidacloprid 2,15%" },
    { label: "Deltametrina 0,2%", value: "Deltametrina 0,2%" },
    { label: "ECOLOGICO- NO TOXICO", value: "ECOLOGICO- NO TOXICO" },
    { label: "Otro", value: "Otro" },
    { label: "Vacío", value: "-" },
  ];

  const laboratorioCaminadores = [
    { label: "BAYER, ENVU", value: "BAYER, ENVU" },
    { label: "CHEMOTECNICA", value: "CHEMOTECNICA" },
    { label: "GELTEK", value: "GELTEK" },
    { label: "GLEBA S.A", value: "GLEBA S.A" },
    { label: "FLY HUNT", value: "FLY HUNT" },
    { label: "Otro", value: "Otro" },
    { label: "Vacío", value: "-" },
  ];

  const certificadosCaminadores = [
    { label: "C.A-250056", value: "C.A-250056" },
    { label: "C.A-0250030", value: "C.A-0250030" },
    { label: "C.S- 375 / C.A- 0250010", value: "C.S- 375 / C.A- 0250010" },
    { label: "C.A-0250103", value: "C.A-0250103" },
    { label: "C.S-3250 / C.A-0250101", value: "C.S-3250 / C.A-0250101" },
    { label: "C-2907", value: "C-2907" },
    { label: "C.A-0250082", value: "C.A-0250082" },
    { label: "C.S- 30.997", value: "C.S- 30.997" },
    { label: "C.S-0566 / C.A-0270002", value: "C.S-0566 / C.A-0270002" },
    { label: "C.S-00284", value: "C.S-00284" },
    {
      label: "C.S- 0250016 /C.A- 0250016",
      value: "C.S- 0250016 /C.A- 0250016",
    },
    { label: "Otro", value: "Otro" },
    { label: "Vacío", value: "-" },
  ];

  const [ubicacionCaminadores, setUbicacionCaminadores] = useState(""); // Estado para manejar el texto del input
  const [selectedProductoCaminadores, setSelectedProductoCaminadores] =
    useState(""); // Estado para manejar la selección en el Dropdown
  const [
    selectedPrincipioActivoCaminadores,
    setSelectedPrincipioActivoCaminadores,
  ] = useState("");
  const [selectedLaboratorioCaminadores, setSelectedLaboratorioCaminadores] =
    useState("");
  const [selectedCertificados, setSelectedCertificados] = useState("");
  const [observacionesCaminadores, setObservacionesCaminadores] = useState("");

  const LimpiarCaminadores = () => {
    // Función para limpiar los campos de los caminadores
    setUbicacionCaminadores("");
    setSelectedProductoCaminadores("");
    setSelectedPrincipioActivoCaminadores("");
    setSelectedLaboratorioCaminadores("");
    setSelectedCertificados("");
    setObservacionesCaminadores("");
  };

  return (
    <ScrollView>
      <View style={styles.caminadoresContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setUbicacionCaminadores(value)}
          value={ubicacionCaminadores}
          placeholder="Ubicación:"
        />
        <Dropdown
          data={productoCaminadores}
          search
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedProductoCaminadores} // Valor actualmente seleccionado
          placeholder="Producto utilizado:"
          onChange={(item) => {
            setSelectedProductoCaminadores(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={principioActivoCaminadores}
          search
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedPrincipioActivoCaminadores} // Valor actualmente seleccionado
          placeholder="Principio Activo:"
          onChange={(item) => {
            setSelectedPrincipioActivoCaminadores(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={laboratorioCaminadores}
          search
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedLaboratorioCaminadores} // Valor actualmente seleccionado
          placeholder="Laboratorio:"
          onChange={(item) => {
            setSelectedLaboratorioCaminadores(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <Dropdown
          data={certificadosCaminadores}
          search
          maxHeight={200}
          labelField="label" // Define la clave que contiene el texto visible
          valueField="value" // Define la clave que contiene el valor interno
          value={selectedCertificados} // Valor actualmente seleccionado
          placeholder="Certificados:"
          onChange={(item) => {
            setSelectedCertificados(item.value); // Cambiar el valor seleccionado
          }}
          style={styles.dropdown} // Estilo del componente Dropdown
          placeholderStyle={styles.placeholderStyle} // Estilo del texto del placeholder
          selectedTextStyle={styles.selectedTextStyle} // Estilo del texto seleccionado
          inputSearchStyle={styles.inputSearchStyle} // Estilo del input de búsqueda
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setObservacionesCaminadores(value)}
          value={observacionesCaminadores}
          placeholder="Observaciones:"
        />
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
                !ubicacionCaminadores ||
                !selectedProductoCaminadores ||
                !selectedPrincipioActivoCaminadores ||
                !selectedLaboratorioCaminadores ||
                !selectedCertificados
              ) {
                alert("Por favor, complete todos los campos");
                return;
              } else {
                const newEntry = {
                  Ubicación: ubicacionCaminadores,
                  Producto: selectedProductoCaminadores,
                  PrincipioActivo: selectedPrincipioActivoCaminadores,
                  Laboratorio: selectedLaboratorioCaminadores,
                  Certificados: selectedCertificados,
                  Observaciones: observacionesCaminadores,
                };
                setCaminadoresData((prev) => [...prev, newEntry]); // Agrega el nuevo registro
                //resetea los campos
                LimpiarCaminadores();
              }
              alert("Datos guardados correctamente");
            }}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => {
              onClose();
              LimpiarCaminadores();
            }}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
        {caminadoresData.length > 0 && (
          <View style={styles.spreadsheet}>
            <View style={[styles.containerData, styles.headerData]}>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Ubicación
              </Text>
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
                certificados
              </Text>
              <Text style={[styles.titledatoscajas, styles.column]}>
                Observaciones
              </Text>
            </View>
            {caminadoresData.map((entry, index) => (
              <View style={styles.containerData} key={index}>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.Ubicación}
                </Text>
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
                  {entry.Certificados}
                </Text>
                <Text style={[styles.datoscajas, styles.column]}>
                  {entry.Observaciones}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}