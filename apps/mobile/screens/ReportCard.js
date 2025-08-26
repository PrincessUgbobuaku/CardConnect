import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { TextInput as PaperInput } from "react-native-paper";
import { AppButton } from "../components/MobileButton";
import NavBar from "../components/NavigationBar";

export default function ReportCard() {
  const [reason, setReason] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    setModalVisible(true);
  };

  const confirmReport = () => {
    setModalVisible(false);
    alert("Card report submitted. We will notify you shortly.");
    setReason("");
  };

  return (
    <View style={styles.container}>
      <NavBar title="Report Card" />
      <View style={styles.body}>
        <PaperInput
          label="Reason"
          placeholder="Briefly explain the issue"
          mode="outlined"
          value={reason}
          onChangeText={setReason}
          style={styles.input}
          theme={{ colors: { primary: "#145DA0" } }}
        />
        <AppButton onPress={handleSubmit}>Submit Report</AppButton>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Confirm Report</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to report this card?
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.noButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.noButtonText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.yesButton]}
                  onPress={confirmReport}
                >
                  <Text style={styles.yesButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F2F2" },
  body: { padding: 20, gap: 20 },
  input: { backgroundColor: "#fff" },


  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#145DA0",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  noButton: {
    backgroundColor: "#ddd",
  },
  yesButton: {
    backgroundColor: "#145DA0",
  },
  noButtonText: {
    color: "#555",
    fontWeight: "600",
  },
  yesButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
