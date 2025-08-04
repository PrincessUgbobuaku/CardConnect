// screens/Profile.js
import React from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { Text, Avatar } from "react-native-paper";
import InfoCard from "../components/InfoCard";
import InfoRow from "../components/InfoRow";
import { AppButton } from "../components/button";

export default function Profile() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Section with Blue Header */}
      {/* <View style={styles.headerContainer}> */}
      {/* <Avatar.Image
        size={90}
        source={require("../../assets/profile-photo.png")}
        style={styles.avatar}
      /> */}

      {/* </View> */}
      <View style={styles.topBackground}></View>
      {/* Info Sections */}
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileInfoTopSection}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={90}
              source={require("../assets/profile-photo.png")}
              theme={{ colors: { primary: "grey" } }} // overrides purple
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.name}>Matthew Tanner Smith</Text>
            <Text style={styles.studentId}>230087654</Text>
            <AppButton style={styles.editButton}>Edit profile</AppButton>
          </View>
        </View>

        <InfoCard title="Personal Information">
          <InfoRow label="Full name" value="Matthew Tanner Smith" />
          <InfoRow label="Student ID" value="230087654" />
          <InfoRow label="Email" value="230087654@mycput.ac.za" />
          <InfoRow label="Phone" value="067 455 7777" />
          <InfoRow label="Gender" value="Male" />
          <InfoRow label="Date of Birth" value="4 April 2000" />
        </InfoCard>

        <InfoCard title="Academic Information">
          <InfoRow label="Department" value="Informatics & Design" />
          <InfoRow label="Year of study" value="2" />
          <InfoRow label="Job title" value="Student" />
          <InfoRow label="Card status" value="Active" />
        </InfoCard>

        <InfoCard title="System Settings">
          <InfoRow label="Language" value="System Default (English)" />
          <InfoRow
            label="Privacy settings"
            value="Only instructors can view my profile information"
          />
        </InfoCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#145DA0",
  },

  topBackground: {
    backgroundColor: "#145DA0",
    height: 150,
  },

  headerContainer: {
    backgroundColor: "#145DA0",
    paddingTop: 60,
    paddingBottom: 100, // more bottom space for overlap
    alignItems: "center",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    position: "relative",
    zIndex: 1,
  },

  avatarContainer: {
    position: "absolute",
    top: "-60", // push it halfway into the red
    zIndex: 2,
    borderRadius: 100,
    elevation: 4,
  },

  avatar: {
    backgroundColor: "transparent", // remove internal bg if needed
  },

  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40, // space for the avatar
    marginBottom: 40,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  studentId: {
    color: "black",
    marginBottom: 10,
  },
  editButton: {
    marginTop: 10,
    width: 140,
  },
  profileInfoContainer: {
    padding: 20,
    backgroundColor: "#F5F2F2",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 0,
    borderBottomLeftRadius: 0,
    // margintop: 300,
  },
  profileInfoTopSection: {
    flexDirection: "column",
    alignItems: "center",
  },
});
