import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import { AppButton } from '../components/button';

export default function PrintPagesScreen() {
  const [credits, setCredits] = useState(50); // Example: 50 pages available
  const [pagesToPrint, setPagesToPrint] = useState('');
  const [printHistory, setPrintHistory] = useState([]);

  const handlePrint = () => {
    const pages = parseInt(pagesToPrint);
    if (!pages || pages <= 0) {
      alert('Enter a valid number of pages to print.');
      return;
    }
    if (pages > credits) {
      alert('Not enough printing credits.');
      return;
    }
    setCredits(credits - pages);
    setPrintHistory([...printHistory, { date: new Date().toLocaleString(), pages }]);
    setPagesToPrint('');
    alert(`Print job submitted for ${pages} page(s).`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader text="Print Pages" />
      <Text style={styles.credits}>Printing Credits: {credits}</Text>
      <TextInput
        style={styles.input}
        placeholder="Number of pages to print"
        keyboardType="numeric"
        value={pagesToPrint}
        onChangeText={setPagesToPrint}
      />
      <AppButton style={styles.printBtn} onPress={handlePrint}>
        Print
      </AppButton>
      <Text style={styles.historyTitle}>Print History</Text>
      {printHistory.length === 0 ? (
        <Text style={styles.noHistory}>No print jobs yet.</Text>
      ) : (
        printHistory.map((job, idx) => (
          <View key={idx} style={styles.historyItem}>
            <Text>{job.date} - {job.pages} page(s)</Text>
          </View>
        ))
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F9F9',
  },
  credits: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#145DA0',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#284B63',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  printBtn: {
    marginBottom: 24,
    borderRadius: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#284B63',
  },
  noHistory: {
    fontStyle: 'italic',
    color: '#888',
  },
  historyItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
