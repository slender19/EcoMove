import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/header";
import HistorialCard from "../components/HistorialCard";
import SuggestionBubble from "../components/SuggestionBubble";
import SuggestionModal from "../components/SuggestinModal";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header title="Ecomove" />
      <HistorialCard />
      <SuggestionBubble onPress={() => setModalVisible(true)} />
      <SuggestionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#d0f5d9", padding: 20 },
});
