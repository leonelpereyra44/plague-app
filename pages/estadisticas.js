import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dropdown } from "react-native-element-dropdown";
import { supabase } from "../utils/database/supabaseClient";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const screenWidth = Dimensions.get("window").width - 20;

const tipos = {
  cantidadconsumo: "Consumo",
  cantvivos: "Vivos",
  cantmuertos: "Muertos",
};

const agrupamientos = {
  mensual: "Mensual",
  semanal: "Semanal",
};

export default function Estadisticas() {
  const [datosOriginales, setDatosOriginales] = useState({});
  const [datosPorPlanta, setDatosPorPlanta] = useState({});
  const [tipo, setTipo] = useState("cantidadconsumo");
  const [clientes, setClientes] = useState([]);
  const [plantas, setPlantas] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modoAgrupacion, setModoAgrupacion] = useState("mensual");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesResp, plantasResp, controlesResp] = await Promise.all([
          supabase.from("clientes").select("id, nombre"),
          supabase.from("plantas").select("id, nombre, cliente_id"),
          supabase
            .from("controles")
            .select(
              "fecha, cantvivos, cantmuertos, cantidadconsumo, planta_id",
            ),
        ]);

        if (clientesResp.error) throw clientesResp.error;
        if (plantasResp.error) throw plantasResp.error;
        if (controlesResp.error) throw controlesResp.error;

        setClientes(clientesResp.data);
        setPlantas(plantasResp.data);

        const grouped = {};

        controlesResp.data.forEach((row) => {
          const fecha = dayjs(row.fecha);
          const clave =
            modoAgrupacion === "semanal"
              ? `${fecha.year()}-S${String(fecha.isoWeek()).padStart(2, "0")}`
              : `${fecha.year()}-${String(fecha.month() + 1).padStart(2, "0")}`;

          if (!grouped[row.planta_id]) grouped[row.planta_id] = {};
          if (!grouped[row.planta_id][clave]) {
            grouped[row.planta_id][clave] = {
              clave,
              cantvivos: 0,
              cantmuertos: 0,
              cantidadconsumo: 0,
            };
          }

          grouped[row.planta_id][clave].cantvivos += row.cantvivos || 0;
          grouped[row.planta_id][clave].cantmuertos += row.cantmuertos || 0;
          grouped[row.planta_id][clave].cantidadconsumo +=
            row.cantidadconsumo || 0;
        });

        setDatosOriginales(grouped);
      } catch (err) {
        console.error("Error al cargar datos:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [modoAgrupacion]);

  useEffect(() => {
    if (datosOriginales && clienteSeleccionado !== null) {
      actualizarDatosPorTipo(datosOriginales, tipo);
    }
  }, [clienteSeleccionado, tipo, datosOriginales]);

  const actualizarDatosPorTipo = (data, tipoSeleccionado) => {
    const plantasCliente = plantas.filter(
      (p) => p.cliente_id === clienteSeleccionado,
    );
    const parsed = {};

    plantasCliente.forEach((planta) => {
      const entradas = data[planta.id];
      if (!entradas) return;

      const ordenadas = Object.values(entradas).sort((a, b) =>
        a.clave.localeCompare(b.clave),
      );

      parsed[planta.nombre] = {
        labels: ordenadas.map((m) =>
          modoAgrupacion === "semanal"
            ? m.clave.replace("-", "\n") // ejemplo: 2024-S14
            : dayjs(m.clave).format("MM/YY"),
        ),
        data: ordenadas.map((m) => m[tipoSeleccionado]),
      };
    });

    setDatosPorPlanta(parsed);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        Estadísticas {agrupamientos[modoAgrupacion]}
      </Text>

      {/* Dropdown Cliente */}
      <Text style={styles.label}>Seleccioná un cliente:</Text>
      <Dropdown
        style={styles.dropdown}
        data={clientes.map((c) => ({ label: c.nombre, value: c.id }))}
        labelField="label"
        valueField="value"
        placeholder="Seleccionar cliente"
        value={clienteSeleccionado}
        onChange={(item) => setClienteSeleccionado(item.value)}
      />

      {/* Botones Tipo */}
      <View style={styles.selectorContainer}>
        {Object.entries(tipos).map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.selectorButton,
              tipo === key && styles.selectorActivo,
            ]}
            onPress={() => setTipo(key)}
          >
            <Text
              style={[
                styles.selectorTexto,
                tipo === key && styles.selectorTextoActivo,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones Agrupamiento */}
      <View style={styles.selectorContainer}>
        {Object.entries(agrupamientos).map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.selectorButton,
              modoAgrupacion === key && styles.selectorActivo,
            ]}
            onPress={() => setModoAgrupacion(key)}
          >
            <Text
              style={[
                styles.selectorTexto,
                modoAgrupacion === key && styles.selectorTextoActivo,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Gráficos */}
      {loading ? (
        <Text style={styles.text}>Cargando datos...</Text>
      ) : clienteSeleccionado === null ? (
        <Text style={styles.text}>Seleccioná un cliente</Text>
      ) : Object.keys(datosPorPlanta).length === 0 ? (
        <Text style={styles.text}>
          No hay datos disponibles para este cliente.
        </Text>
      ) : (
        Object.entries(datosPorPlanta).map(
          ([nombrePlanta, { labels, data }]) => (
            <View key={nombrePlanta} style={styles.graficoContainer}>
              <Text style={styles.subtitulo}>{nombrePlanta}</Text>
              <BarChart
                data={{
                  labels,
                  datasets: [{ data }],
                }}
                width={screenWidth}
                height={220}
                fromZero
                yAxisLabel=""
                chartConfig={{
                  backgroundGradientFrom: "#1b3b4f",
                  backgroundGradientTo: "#1b3b4f",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                  labelColor: () => "#ffffff",
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}
                verticalLabelRotation={30}
              />
            </View>
          ),
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdown: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  selectorButton: {
    padding: 8,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  selectorActivo: {
    backgroundColor: "#4caf50",
  },
  selectorTexto: {
    color: "#333",
  },
  selectorTextoActivo: {
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  graficoContainer: {
    marginBottom: 20,
  },
});
