import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

const ScreenHeader = ({ text }) => {
  return (
    <View>
      <PaperText variant="headlineMedium" style={styles.headerText}>
        {text}
      </PaperText>
    </View>
  );
};


const styles = StyleSheet.create({
//   headerContainer: {
//     marginTop: 20,
//     marginBottom: 16,
//     paddingHorizontal: 20,
//   },
  headerText: {
    textAlign: 'center',
    paddingLeft: 60,
    paddingRight: 60,
    fontWeight: '700',
    color: '#000000',
  },
});

export default ScreenHeader;