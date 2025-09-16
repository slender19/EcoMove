import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", marginBottom: 20 },
  text: { fontSize: 28, fontWeight: "bold", color: "#2e7d32" },
});
