import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function LoginScreen() {
  const handleLogin = () => {
    Alert.alert("Ecomove ", "Inicio de sesión simulado");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ecomove 🚲</Text>
      <Text style={styles.subtitle}>Inicia sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        ¿No tienes cuenta? <Text style={{ color: "#2e7d32" }}>Regístrate</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2e7d32",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
  },
});
