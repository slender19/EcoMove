import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

export default function EditStationModal({
  visible,
  station,
  onClose,
  onSave,
  onChangeName,
  onChangeCapacity,
  onChangeLocation,
}) {
  if (!station) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Editar Estación</Text>

          <TextInput
            placeholder="Nombre"
            style={styles.input}
            value={station.name}
            onChangeText={onChangeName}
          />

          <TextInput
            placeholder="Capacidad"
            style={styles.input}
            keyboardType="numeric"
            value={String(station.capacity)}
            onChangeText={onChangeCapacity}
          />

          <TextInput
            placeholder="Dirección / Ubicación"
            style={styles.input}
            value={station.location}
            onChangeText={onChangeLocation}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={[styles.button, { flex: 1, marginRight: 8 }]}
              onPress={onSave}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { flex: 1, backgroundColor: "#9e9e9e" }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  content: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#2e7d32" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
