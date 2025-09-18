import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function EditVehicleModal({
  visible,
  vehicle,
  stations,
  onClose,
  onSave,
  onChangeType,
  onChangeStatus,
  onChangeStation,
}) {
  if (!vehicle) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Editar Vehículo</Text>

          <TextInput
            placeholder="Tipo"
            style={styles.input}
            value={vehicle.type}
            onChangeText={onChangeType}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Estado</Text>
            <Picker
              selectedValue={vehicle.status}
              onValueChange={onChangeStatus}
              style={styles.picker}
            >
              <Picker.Item label="Disponible" value="disponible" />
              <Picker.Item label="En uso" value="en uso" />
              <Picker.Item label="Mantenimiento" value="mantenimiento" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Estación</Text>
            <Picker
              selectedValue={vehicle.stationId}
              onValueChange={onChangeStation}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione una estación" value={null} />
              {stations.map((station) => (
                <Picker.Item
                  key={station.id}
                  label={station.name}
                  value={station.id}
                />
              ))}
            </Picker>
          </View>

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
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#1565c0" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: { fontSize: 14, fontWeight: "bold", marginLeft: 10, marginTop: 5 },
  picker: { height: 50, width: "100%" },
  button: {
    backgroundColor: "#1565c0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
