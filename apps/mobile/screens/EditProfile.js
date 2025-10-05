// screens/EditProfile.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { AppButton } from "../components/MobileButton";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function EditProfile() {
  const navigation = useNavigation();
  const studentNumber = "STU000002"; // Replace with actual value (or from auth context)

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Editable fields
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photoUpdated, setPhotoUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `http://192.168.101.106:9091/api/profile/${studentNumber}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await res.json();
      setProfile(data);
      setPhone(data.contactNumber || "");
      setEmail(data.email || "");
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://192.168.101.106:9091/api/profile/${studentNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contactNumber: phone,
            email: email,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      Alert.alert("Success", "Profile updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // Updated photo upload handler
  const handlePhotoUpload = async () => {
    try {
      // Request permission first
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Permission to access media library is required!"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images", // Correct enum usage here
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // Check if user cancelled or no assets returned
      if (result.canceled || !result.assets || result.assets.length === 0) {
        Alert.alert("No image selected", "You did not select any image.");
        return;
      }

      // Get the selected photo object
      const photo = result.assets[0];

      // Create FormData for upload
      const formData = new FormData();
      formData.append("file", {
        uri: photo.uri,
        name: photo.fileName || "profile.jpg", // Use fileName if available
        type: photo.type || "image/jpeg", // Use mime type if available
      });

      // Upload photo to backend
      const res = await fetch(
        `http://192.168.101.106:9091/api/profile/${studentNumber}/photo`,
        {
          method: "PUT",
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload photo");
      }

      Alert.alert("Photo Updated", "Profile photo uploaded successfully.");
      setPhotoUpdated(true);
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
      console.error("Upload error:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Custom Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back" size={28} color="#145DA0" />
      </TouchableOpacity>

      <View style={styles.photoContainer}>
        <Image
          source={{
            uri: `http://192.168.101.106:9091/api/profile/${studentNumber}/photo?timestamp=${Date.now()}`,
          }}
          style={styles.photo}
        />
        <TouchableOpacity onPress={handlePhotoUpload}>
          <Button mode="outlined" style={styles.photoButton}>
            Upload New Photo
          </Button>
        </TouchableOpacity>
      </View>

      <TextInput
        label="First Name"
        value={profile.firstName}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Last Name"
        value={profile.lastName}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Student ID"
        value={profile.userId}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Gender"
        value={profile.gender === "M" ? "Male" : "Female"}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Date of Birth"
        value={new Date(profile.dateOfBirth).toLocaleDateString()}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Department"
        value={profile.department}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Year of Study"
        value={String(profile.yearOfStudy)}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Role"
        value={profile.role}
        editable={false}
        style={styles.readOnly}
      />
      <TextInput
        label="Card Status"
        value="Active"
        editable={false}
        style={styles.readOnly}
      />

      <AppButton style={styles.saveButton} onPress={handleSave}>
        Save
      </AppButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F2F2",
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  readOnly: {
    marginBottom: 15,
    backgroundColor: "#e0e0e0",
  },
  saveButton: {
    marginTop: 10,
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  photoButton: {
    marginTop: 10,
    borderColor: "#145DA0",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 5,
  },
});
