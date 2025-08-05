import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// ...existing code...
import { Card } from 'react-native-paper';
import { AppButton } from '../components/button'; // Custom button component
import ScreenHeader from '../components/ScreenHeader'; // Custom header component

export default function CardAppointmentScreen() {
  const [date, setDate] = useState(new Date(2024, 8, 14)); // Example default: 14 Sep 2024
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('14:00 PM');

  const timeSlots = ['10:00 AM', '12:00 AM', '14:00 PM', '15:00 PM'];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ScreenHeader text="Card Appointment" />
      <Text style={styles.subheading}>Schedule an appointment to get your physical card</Text>

      {/* Date Picker */}
      <Text style={styles.step}>Step 1: Select a date</Text>
      <TouchableOpacity style={styles.dateBox} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>
      {showDatePicker && (
  <DateTimePicker
    value={date}
    mode="date"
    display="default"
    onChange={handleDateChange}
  />
)}

      {/* Time Slot Selection */}
      <Text style={styles.step}>Step 2: Select a time</Text>
      <View style={styles.timeContainer}>
        {timeSlots.map((time) => (
          <TouchableOpacity
            key={time}
            style={[styles.timeSlot, selectedTime === time && styles.selectedTime]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Preview Booking Card */}
      <Text style={styles.step}>Step 3: Preview booking details</Text>
      <Card style={styles.previewCard}>
        <Card.Content>
          <Text style={styles.previewText}>Booking details:</Text>
          <Text>Date: {formatDate(date)}</Text>
          <Text>Time: {selectedTime}</Text>
          <Text>Location: Cape Peninsula University of Technology</Text>
        </Card.Content>
      </Card>

      {/* Confirm Button */}
      <AppButton onPress={() => alert('Appointment Confirmed')} style={styles.confirmBtn}>
        Confirm
      </AppButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F9F9',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 20,
    color: '#3C6E71',
    textAlign: 'center',
  },
  step: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#284B63',
  },
  dateBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#284B63',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#122C34',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 10,
  },
  timeSlot: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#D9E4EC',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTime: {
    backgroundColor: '#284B63',
  },
  timeText: {
    color: '#284B63',
  },
  selectedTimeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  previewCard: {
    backgroundColor: '#EAF2F2',
    marginVertical: 10,
  },
  previewText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  confirmBtn: {
    marginTop: 20,
    borderRadius: 10,
  },
});

