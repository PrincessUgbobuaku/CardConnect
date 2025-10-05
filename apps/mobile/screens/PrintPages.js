import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PrintPages() {
  return (
    <View style={styles.container}>
      <Text>Print Pages Screen</Text>
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
