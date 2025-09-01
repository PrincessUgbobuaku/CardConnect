import { StatusBar } from "expo-status-bar";
import { TextInput as PaperInput } from "react-native-paper";
import { Text as PaperText } from "react-native-paper";
import { AppButton } from "../components/MobileButton.js";

import { StyleSheet, Text, View, Image, Alert } from "react-native";

import { useState } from "react";

export default function Login({ navigation }) {
  const [studentNumber, setStudentNumber] = useState(""); // added email/username
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://192.168.101.108:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: studentNumber, // backend expects email
            password: password,
          }),
        }
      );

      const textResponse = await response.text(); // Read body once
      let data;

      try {
        data = JSON.parse(textResponse); // Try to parse as JSON
      } catch {
        data = textResponse; // Use raw text if not JSON
      }

      if (!response.ok) {
        // Show error message (either from backend or fallback)
        setError(data?.message || data || "Login failed");
        setLoading(false);
        return;
      }

      setLoading(false);

      // Success logic
      Alert.alert("Success", "Logged in successfully!");
      // navigation.navigate('Dashboard'); // optional
    } catch (err) {
      setLoading(false);
      setError("Network error: " + err.message);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <StatusBar style="dark" />

      <View style={styles.loginHeaderContainer}>
        <View style={styles.logoImageContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />
        </View>
        <View>
          <PaperText variant="headlineMedium" style={styles.loginText}>
            Log in to your CPUT Card Account
          </PaperText>
        </View>
        <View>
          <PaperText>Secure Access Portal</PaperText>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <PaperInput
          label="Student number"
          placeholder="Enter your student number"
          mode="outlined"
          style={styles.inputText}
          theme={{ colors: { primary: "#145DA0" } }}
          selectionColor="orange"
          cursorColor="orange"
          value={studentNumber}
          onChangeText={(text) => setStudentNumber(text)}
        />
        <PaperInput
          label="Password"
          placeholder="Enter your password"
          mode="outlined"
          style={styles.inputText}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={secureText}
          right={
            <PaperInput.Icon
              icon={secureText ? "eye-off" : "eye"}
              onPress={() => setSecureText(!secureText)}
            />
          }
          selectionColor="orange"
          cursorColor="orange"
          value={password}
        />
      </View>

      {error && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
          {error}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <AppButton
          onPress={handleLogin}
          disabled={loading}
          style={{ width: 150 }}
        >
          {loading ? "Logging in..." : "Login"}
        </AppButton>
      </View>

      <View style={styles.forgotPasswordContainer}>
        <PaperText variant="bodyMedium" style={styles.forgotPassword}>
          Forgot password?{" "}
          <PaperText variant="bodyMedium" style={styles.bottomImage}>
            CLICK HERE
          </PaperText>
        </PaperText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... your existing styles here ...
  loginContainer: {
    flex: 1,
    backgroundColor: "#F5F2F2",
    width: "100%",
    flexDirection: "column",
  },

  loginHeaderContainer: {
    paddingTop: 60,
    paddingBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#145DA0",
    gap: 20,
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    width: 600,
    alignSelf: "center",
    marginBottom: 80,
  },

  logoImageContainer: {},

  logoImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  loginText: {
    textAlign: "center",
    paddingLeft: 150,
    paddingRight: 150,
    fontWeight: "700",
    color: "#000000",
  },

  inputContainer: {
    paddingLeft: 35,
    paddingRight: 35,
    gap: 40,
    marginBottom: 100,
  },

  inputText: {
    paddingLeft: 10,
    fontStyle: "normal",
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: 100,
  },

  forgotPasswordContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  forgotPassword: {
    textAlign: "center",
  },
});
