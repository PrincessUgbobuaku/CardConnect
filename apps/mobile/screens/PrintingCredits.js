import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader";
import { AppButton } from "../components/button";

export default function LoadCreditsScreen() {
  const [credits, setCredits] = useState(50); // Example starting balance
  const [amountToLoad, setAmountToLoad] = useState("");

  const handleLoadCredits = () => {
    const amount = parseInt(amountToLoad);
    if (!amount || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount to load.");
      return;
    }

    setCredits(credits + amount);
    Alert.alert(
      "Success",
      `Successfully loaded ${amount} credits. New balance: ${credits + amount}`
    );
    setAmountToLoad("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader text="Load Printing Credits" />

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>{credits} credits</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter amount to load"
        keyboardType="numeric"
        value={amountToLoad}
        onChangeText={setAmountToLoad}
      />

      <AppButton style={styles.loadBtn} onPress={handleLoadCredits}>
        Load Credits
      </AppButton>

      {/* Future: Add payment gateway integration */}
      <Text style={styles.note}>
        *In production, this could link to a payment gateway (e.g. PayFast,
        PayPal).
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F9F9",
  },
  balanceCard: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#145DA0",
    borderRadius: 12,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#fff",
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#284B63",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  loadBtn: {
    marginBottom: 20,
    borderRadius: 10,
  },
  note: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
    textAlign: "center",
  },
});
