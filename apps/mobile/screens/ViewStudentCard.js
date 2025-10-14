import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import NavBar from "../components/NavigationBar";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";
import QRCode from "react-native-qrcode-svg"; 

export default function ViewStudentCard() {
  const navigation = useNavigation();
  const { token } = useContext(UserContext); // Ensure your UserContext provides the JWT token
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await fetch("http://192.168.101.106:9091/api/student-info", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStudentInfo(data);
        } else {
          setStudentInfo(null);
        }
      } catch (error) {
        setStudentInfo(null);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStudentInfo();
    }
  }, [token]);

  if (loading) {
    return (
      <View style={[styles.outerContainer, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#145DA0" />
      </View>
    );
  }

  if (!studentInfo) {
    return (
      <View style={[styles.outerContainer, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "#145DA0", fontWeight: "bold" }}>
          Unable to load student information.
        </Text>
      </View>
    );
  }

  // Generate a unique QR code value for the student (e.g., student number + timestamp or just student number)
  const qrValue = studentInfo.userId; // You can make this more unique if needed

  return (
    <View style={styles.outerContainer}>
      <NavBar title="Student Card" />

      <Text style={styles.virtualCardHeading}>Virtual Card</Text>

      <View style={styles.studentCard}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons
            name="school-outline"
            size={30}
            color="white"
            style={styles.cardHeaderIcon}
          />
          <View style={styles.cardHeaderTextContainer}>
            <Text style={styles.cardHeaderUniName}>
              Cape Peninsula University of Technology
            </Text>
            <Text style={styles.cardHeaderSubText}>Virtual Student Card</Text>
          </View>
        </View>

        <View style={styles.profileAndDetailsContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${studentInfo.photoBase64}` }}
            style={styles.profileImage}
            onError={(e) => console.log(e.nativeEvent.error)}
          />

          <View style={styles.infoContainer}>
            <Text style={styles.name}>
              {studentInfo.firstName} {studentInfo.lastName}
            </Text>

            <Text style={styles.label}>Student Number</Text>
            <Text style={styles.value}>{studentInfo.userId}</Text>

            <Text style={styles.label}>Faculty</Text>
            <Text style={styles.value}>{studentInfo.faculty || "N/A"}</Text>

            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>{studentInfo.department || "N/A"}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{studentInfo.institutionalEmail || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.additionalInfoBlock}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Valid Until</Text>
              <Text style={styles.value}>{studentInfo.validUntil || "31 December 2025"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Campus</Text>
              <Text style={styles.value}>{studentInfo.campus || "Bellville Campus"}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Card Type</Text>
              <Text style={styles.value}>{studentInfo.cardType || "Full-time Undergraduate"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Access Level</Text>
              <Text style={styles.value}>
                {studentInfo.accessLevel || "Academic Buildings, Library, Labs"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.qrSection}>
          <QRCode value={qrValue} size={120} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.reportBtn}
        onPress={() => navigation.navigate("ReportCard")}
      >
        <Text style={styles.reportText}>Report as Lost/Stolen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  virtualCardHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  studentCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  cardHeader: {
    backgroundColor: "#145DA0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  cardHeaderIcon: {
    marginRight: 15,
  },
  cardHeaderTextContainer: {
    flexDirection: "column",
  },
  cardHeaderUniName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardHeaderSubText: {
    color: "white",
    fontSize: 12,
  },
  profileAndDetailsContainer: {
    flexDirection: "row",
    padding: 15,
  },
  profileImage: {
    width: 90,
    height: 130,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#000",
  },
  label: {
    fontSize: 16,
    color: "#888888",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#000",
  },
  additionalInfoBlock: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailItem: {
    flex: 1,
  },
  qrSection: {
    paddingVertical: 20,
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "#EEE",
    marginTop: 2,
  },
  reportBtn: {
    borderWidth: 1,
    borderColor: "#145DA0",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  reportText: {
    color: "#145DA0",
    fontWeight: "bold",
    fontSize: 14,
  },
});
