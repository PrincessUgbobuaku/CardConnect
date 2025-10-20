import React, { useContext, useEffect, useState } from "react";
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
  const { studentInfo, token } = useContext(UserContext);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!token) return;
      try {
        const response = await fetch("http://192.168.1.14:9091/api/profile/photo", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token,
          },
        });
        if (response.ok) {
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result.split(",")[1];
            setPhotoBase64(base64data);
            setPhotoLoading(false);
          };
          reader.readAsDataURL(blob);
        } else {
          setPhotoLoading(false);
        }
      } catch (error) {
        setPhotoLoading(false);
      }
    };
    fetchPhoto();
  }, [token]);

  if (!studentInfo) {
    return (
      <View style={[styles.outerContainer, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#145DA0" />
        <Text style={{ color: "#145DA0", fontWeight: "bold", marginTop: 10 }}>
          Loading student information...
        </Text>
      </View>
    );
  }

  const qrValue = studentInfo.userId;

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
          {photoLoading ? (
            <ActivityIndicator size="small" color="#145DA0" style={styles.profileImage} />
          ) : (
            <Image
              source={
                photoBase64
                  ? { uri: `data:image/jpeg;base64,${photoBase64}` }
                  : require("../assets/images.jpg")
              }
              style={styles.profileImage}
            />
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.name}>
              {studentInfo.firstName} {studentInfo.lastName}
            </Text>
            <Text style={styles.label}>Student Number</Text>
            <Text style={styles.value}>{studentInfo.userId}</Text>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>{studentInfo.department || "N/A"}</Text>
            <Text style={styles.label}>Degree</Text>
            <Text style={styles.value}>{studentInfo.degree || "N/A"}</Text>
            <Text style={styles.label}>School</Text>
            <Text style={styles.value}>{studentInfo.school || "N/A"}</Text>
            <Text style={styles.label}>Year of Study</Text>
            <Text style={styles.value}>{studentInfo.yearOfStudy || "N/A"}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{studentInfo.email || "N/A"}</Text>
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
