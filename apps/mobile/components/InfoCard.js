// components/InfoCard.js
// For personal / academic / system sections
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function InfoCard({ title, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <Card style={styles.card}>
        <Card.Content>{children}</Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#145DA0',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
});