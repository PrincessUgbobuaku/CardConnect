import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import NavBar from "../components/NavigationBar";
import { UserContext } from "../contexts/UserContext";

export default function NotificationsCenter() {
  const { token } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://192.168.1.14:9091/api/notifications", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (e) {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchNotifications();
  }, [token]);

  return (
    <View style={styles.container}>
      <NavBar title="Notifications" />
      {loading ? (
        <ActivityIndicator size="large" color="#145DA0" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView style={styles.body}>
          {notifications.map((note, idx) => (
            <View key={note.id || idx} style={styles.notificationCard}>
              <Icon name="notifications" size={24} color="#145DA0" style={styles.notificationIcon} />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationTitle}>{note.title}</Text>
                <Text style={styles.notificationMessage}>{note.message}</Text>
                <Text style={styles.notificationTime}>{note.time}</Text>
              </View>
            </View>
          ))}
          {notifications.length === 0 && (
            <Text style={{ textAlign: "center", color: "#888", marginTop: 30 }}>
              No notifications found.
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F2F2" },
  body: { paddingHorizontal: 20, paddingTop: 20 },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  notificationIcon: { marginRight: 10, marginTop: 2 },
  notificationTextContainer: { flex: 1 },
  notificationTitle: { fontWeight: "bold", fontSize: 16, color: "#000" },
  notificationMessage: { fontSize: 14, color: "#333", marginTop: 2 },
  notificationTime: { fontSize: 12, color: "#888", marginTop: 5 },
});
