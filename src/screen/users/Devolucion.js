// Devoluciones.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Devoluciones() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Devoluciones</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
