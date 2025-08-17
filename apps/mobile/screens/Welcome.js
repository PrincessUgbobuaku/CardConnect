import { StatusBar } from "expo-status-bar";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput as PaperInput } from "react-native-paper";
import { Text as PaperText } from "react-native-paper";
import { StyleSheet, Image } from "react-native";
import { AppButton } from "../components/MobileButton.js";

export default function Welcome({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.welcomeContainer}>
          <View style={styles.welcomeHeaderContainer}>
            <View style={styles.logoImageContainer}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logoImage}
              />
            </View>
            <View>
              <PaperText variant="headlineMedium" style={styles.logoText}>
                CardConnect
              </PaperText>
              <PaperText variant="bodyMedium" style={styles.logoText}>
                STUDENT LIFE. DIGITIZED.
              </PaperText>
            </View>
          </View>

          <View style={styles.welcomeImageContainer}>
            <Image
              source={require("../assets/welcome-image.png")}
              style={styles.welcomeImage}
            />
          </View>
          <PaperText variant="displayMedium" style={styles.welcomeHeading}>
            Your student life.
          </PaperText>
          <PaperText variant="displayMedium" style={styles.welcomeHeading}>
            Digitized.
          </PaperText>
          <PaperText variant="bodyMedium" style={styles.welcomeText}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
            ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
            tellus duis convallis.
          </PaperText>
        </ScrollView>
        {/* Navigation Buttons always visible at bottom */}
        <View style={styles.welcomeButtonContainer}>
          <AppButton
            style={[{ width: 150 }]}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign up
          </AppButton>
          <AppButton
            style={[{ width: 150 }]}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </AppButton>
          {/* ✅ Appointment Button */}
          {/* <AppButton
            style={[{ width: 150 }]}
            onPress={() => navigation.navigate("CardAppointment")}
          >
            Test Appointment
          </AppButton> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },

  logoImageContainer: {
    // alignItems: "center",
  },

  logoImage: {
    width: 100, // your desired width
    height: 100, // your desired height
    resizeMode: "contain", // optional to keep aspect ratio
  },

  welcomeHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 20,
    // marginTop: 30,
    marginBottom: 40,
  },

  welcomeImageContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  welcomeHeading: {
    textAlign: "center",
  },

  welcomeText: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
  },

  welcomeButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
});
