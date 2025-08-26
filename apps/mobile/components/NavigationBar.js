import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Text as PaperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function NavBar({ title }) {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>

      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu-outline" size={26} color="#000" />
      </TouchableOpacity>

      <View style={styles.center}>
        <Image source={require("../assets/logo.png")} style={styles.navLogo} />
        <PaperText style={styles.navTitle}>{title}</PaperText>
      </View>

      <View style={styles.navRight}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Icon name="notifications-outline" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon}>
          <Icon name="person-circle-outline" size={26} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  navLogo: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  navIcon: {
    marginLeft: 15,
  },
});
