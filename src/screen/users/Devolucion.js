// Devoluciones.js
import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { HistorialContext } from "../components/HistorialContext";
import Header from "../components/header";
import Iconos from "../components/Iconos";

export default function Devoluciones({ navigation }) {
  const { historial, setHistorial } = useContext(HistorialContext);

  const handleDevolver = (index) => {
    // Confirmación antes de devolver
    Alert.alert(
      "Confirmar devolución",
      "¿Estás seguro que quieres devolver este vehículo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, devolver",
          onPress: () => {
            const updated = [...historial];
            updated[index].estado = "terminado"; // cambiamos el estado
            setHistorial(updated);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Ecomove" />

      <Text style={styles.subtitle}>Navegación</Text>
      <View style={styles.menu}>
        <Iconos
          nombre="Solicitar"
          icono="car"
          color="#4CAF50"
          onPress={() => navigation.navigate("Solicitar")}
        />
        <Iconos
          nombre="Home"
          icono="undo"
          color="#2196F3"
          onPress={() => navigation.navigate("HomeScreen")}
        />
        <Iconos
          nombre="Historial"
          icono="history"
          color="#FF9800"
          onPress={() => navigation.navigate("Historial")}
        />
      </View>

      <Text style={styles.subtitle}>Mis Reservas</Text>

      {historial.length === 0 ? (
        <Text style={styles.empty}>No tienes reservas registradas.</Text>
      ) : (
        <FlatList
          data={historial}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.cell}>🚉 {item.origen}</Text>
              <Text style={styles.cell}>🎯 {item.destino}</Text>
              <Text style={styles.cell}>📏 {item.distancia}</Text>
              <Text style={styles.cell}>🛴 {item.transporte}</Text>
              <Text style={styles.price}>💰 {item.costo}</Text>
              <Text
                style={[
                  styles.estado,
                  item.estado === "pendiente"
                    ? styles.pendiente
                    : styles.terminado,
                ]}
              >
                {item.estado.toUpperCase()}
              </Text>

              {item.estado === "pendiente" ? (
                <TouchableOpacity
                  style={styles.devolverBtn}
                  onPress={() => handleDevolver(index)}
                >
                  <Text style={styles.devolverText}>Devolver</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.devuelto}>✔️ Ya devuelto</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e0f7fa", padding: 20 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  menu: { flexDirection: "row", justifyContent: "space-around" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cell: { fontSize: 14 },
  price: { fontWeight: "bold", color: "#00796b", fontSize: 14 },
  estado: { marginTop: 8, fontWeight: "bold", textAlign: "center" },
  pendiente: { color: "#f57c00" },
  terminado: { color: "#388e3c" },
  devolverBtn: {
    backgroundColor: "#2196F3",
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  devolverText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  devuelto: { textAlign: "center", marginTop: 8, color: "#999" },
  empty: { fontSize: 16, textAlign: "center", marginTop: 20, color: "#555" },
});

