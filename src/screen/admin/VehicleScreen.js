import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import VehicleService from "../../services/VehicleService";
import StationService from "../../services/StationService";
import EditVehicleModal from "../../components/EditVehicleModal"; 

export default function VehicleScreen() {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("disponible");
  const [stationId, setStationId] = useState(null);

  const [vehicles, setVehicles] = useState(VehicleService.listVehicles());
  const stations = StationService.listStations();

  const [editVisible, setEditVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const refresh = () => setVehicles([...VehicleService.listVehicles()]);

  const handleAdd = () => {
    const res = VehicleService.createVehicle(type.trim(), status, parseInt(stationId));
    if (!res.success) return Alert.alert("Error", res.message);
    refresh();
    setType("");
    setStatus("disponible");
    setStationId(null);
  };

  const handleDelete = (id) => {
    Alert.alert("Eliminar", "¿Seguro quieres eliminar este vehículo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          const res = VehicleService.deleteVehicle(id);
          if (!res.success) return Alert.alert("Error", res.message);
          refresh();
        },
      },
    ]);
  };

  const handleOpenEdit = (vehicle) => {
    setEditingVehicle({ ...vehicle }); // copia para editar
    setEditVisible(true);
  };

  const handleSaveEdit = () => {
    const { id, type, status, stationId } = editingVehicle;
    const res = VehicleService.updateVehicle(id, type, status, parseInt(stationId));
    if (!res.success) return Alert.alert("Error", res.message);
    setEditVisible(false);
    setEditingVehicle(null);
    refresh();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Vehículos</Text>

      <TextInput
        placeholder="Tipo (ej: bicicleta, patineta)"
        style={styles.input}
        value={type}
        onChangeText={setType}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Estado</Text>
        <Picker selectedValue={status} onValueChange={setStatus} style={styles.picker}>
          <Picker.Item label="Disponible" value="disponible" />
          <Picker.Item label="En uso" value="en uso" />
          <Picker.Item label="Mantenimiento" value="mantenimiento" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Estación</Text>
        <Picker
          selectedValue={stationId}
          onValueChange={setStationId}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una estación" value={null} />
          {stations.map((s) => (
            <Picker.Item key={s.id} label={s.name} value={s.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Agregar Vehículo</Text>
      </TouchableOpacity>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const stationName = stations.find((s) => s.id === item.stationId)?.name || "Sin estación";
          return (
            <View style={styles.row}>
              <View style={styles.card}>
                <Text style={styles.cardText}>
                  {item.type} - {item.status} ({stationName})
                </Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.smallBtn, { backgroundColor: "#ffd54f" }]}
                  onPress={() => handleOpenEdit(item)}
                >
                  <Text style={styles.smallBtnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.smallBtn, { backgroundColor: "#e57373" }]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.smallBtnText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Modal externo */}
      <EditVehicleModal
        visible={editVisible}
        vehicle={editingVehicle}
        stations={stations}
        onClose={() => setEditVisible(false)}
        onSave={handleSaveEdit}
        onChangeType={(v) => setEditingVehicle({ ...editingVehicle, type: v })}
        onChangeStatus={(v) => setEditingVehicle({ ...editingVehicle, status: v })}
        onChangeStation={(v) => setEditingVehicle({ ...editingVehicle, stationId: v })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#e3f2fd" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#1565c0" },
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
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  card: { flex: 1, padding: 15, backgroundColor: "#fff", borderRadius: 8, elevation: 2 },
  cardText: { fontSize: 16 },
  actions: { flexDirection: "column", marginLeft: 8 },
  smallBtn: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 6, marginBottom: 6 },
  smallBtnText: { color: "#fff", fontWeight: "bold" },
});
