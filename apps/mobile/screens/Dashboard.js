import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/NavigationBar";

const { width } = Dimensions.get("window");

export default function Dashboard() {
  const navigation = useNavigation();

  const menuItems = [
    { label: "View virtual card", icon: "card-outline", screen: "Student Card" },
    { label: "Book card appointment", icon: "calendar-outline", screen: "BookAppointment" },
    { label: "Print & Go", icon: "print-outline", screen: "PrintGo" },
    { label: "Report card", icon: "alert-circle-outline", screen: "Report Card" },
    { label: "Profile", icon: "person-outline", screen: "Profile" },
    { label: "Load Printing Credits", icon: "cash-outline", screen: "LoadCredits" },
    { label: "Notifications Centre", icon: "notifications-outline", screen: "Notifications" },
    { label: "Log Out", icon: "log-out-outline", screen: "Login" },
  ];

  return (
    <View style={styles.container}>
      <NavBar title="CARDCONNECT" />

      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={28} color="#145DA0" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F2F2" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    width: (width - 60) / 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  menuText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 8,
    color: "#000",
  },
});
