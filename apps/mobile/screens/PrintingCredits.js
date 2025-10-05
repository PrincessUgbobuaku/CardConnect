import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PrintingCredits() {
  return (
    <View style={styles.container}>
      <Text>Printing Credits Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
