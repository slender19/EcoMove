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
import StationService from "../../services/StationService";
import EditStationModal from "../../components/EditStationModal";

export default function StationScreen() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [stations, setStations] = useState(StationService.listStations());

  const [editVisible, setEditVisible] = useState(false);
  const [editingStation, setEditingStation] = useState(null);

  const refresh = () => setStations([...StationService.listStations()]);

  const handleAdd = () => {
    const res = StationService.createStation(
      name.trim(),
      parseInt(capacity),
      location.trim()
    );
    if (!res.success) return Alert.alert("Error", res.message);
    refresh();
    setName("");
    setCapacity("");
    setLocation("");
  };

  const handleDelete = (id) => {
    Alert.alert("Eliminar", "¿Seguro quieres eliminar esta estación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          const res = StationService.deleteStation(id);
          if (!res.success) return Alert.alert("Error", res.message);
          refresh();
        },
      },
    ]);
  };

  const handleOpenEdit = (station) => {
    setEditingStation({ ...station });
    setEditVisible(true);
  };

  const handleSaveEdit = () => {
    const { id, name, capacity, location } = editingStation;
    const res = StationService.updateStation(
      id,
      name.trim(),
      parseInt(capacity),
      location.trim()
    );
    if (!res.success) return Alert.alert("Error", res.message);
    setEditVisible(false);
    setEditingStation(null);
    refresh();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Estaciones</Text>

      <TextInput
        placeholder="Nombre de la estación"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Capacidad"
        style={styles.input}
        value={capacity}
        keyboardType="numeric"
        onChangeText={setCapacity}
      />

      <TextInput
        placeholder="Dirección / Ubicación"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Agregar Estación</Text>
      </TouchableOpacity>

      <FlatList
        data={stations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                {item.name} - {item.location} (Cap: {item.capacity})
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
        )}
      />

      <EditStationModal
        visible={editVisible}
        station={editingStation}
        onClose={() => setEditVisible(false)}
        onSave={handleSaveEdit}
        onChangeName={(v) => setEditingStation({ ...editingStation, name: v })}
        onChangeCapacity={(v) =>
          setEditingStation({ ...editingStation, capacity: v })
        }
        onChangeLocation={(v) =>
          setEditingStation({ ...editingStation, location: v })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f1f8e9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#2e7d32" },
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
