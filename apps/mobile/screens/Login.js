import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput as PaperInput } from "react-native-paper";
import { Button as PaperButton } from "react-native-paper";
import { Text as PaperText } from "react-native-paper";
import { AppButton } from "../components/button.js";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

export default function Login() {
  const [password, setPassword] = useState(""); //Stores the password typed by the user.
  const [secureText, setSecureText] = useState(true); // Controls visibility of password (true or false)

  return (
    <View style={styles.loginContainer}>
      <StatusBar style="dark" />

      {/* top image */}
      {/* <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/blue-background-top.png")}
          style={styles.topImage}
          //style={styles.backgroundImage}
        />
      </View> */}
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
      {/* input fields */}
      <View style={styles.inputContainer}>
        <PaperInput
          label="Student number"
          placeholder="Enter your student number"
          mode="outlined"
          style={styles.inputText}
          theme={{ colors: { primary: "#145DA0" } }}
          selectionColor="orange"
          cursorColor="orange"
        />
        <PaperInput
          label="Password"
          placeholder="Enter your password"
          mode="outlined"
          style={styles.inputText}
          // theme={{ colors: { primary: "#145DA0" } }}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={secureText} // Hides/shows text
          right={
            <PaperInput.Icon
              icon={secureText ? "eye-off" : "eye"} //icon switches
              onPress={() => setSecureText(!secureText)} // Toggle visibility
            />
          }
          selectionColor="orange"
          cursorColor="orange"
        />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton style={[{ width: "150" }]}>Login</AppButton>
      </View>

      <View style={styles.forgotPasswordContainer}>
        <PaperText variant="bodyMedium" style={styles.forgotPassword}>
          Forgot password?{" "}
          <PaperText variant="bodyMedium" style={styles.bottomImage}>
            CLICK HERE
          </PaperText>
        </PaperText>
      </View>

      {/* <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/blue-background-bottom.png")}
          style={styles.bottomImage}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#F5F2F2",
    width: "100%",
    flexDirection: "column",
  },

  // imageContainer: {
  //   width: "100%",
  //   marginBottom: 50,
  // },

  // topImage: {
  //   width: "100%",
  //   height: 150,
  // },

  loginHeaderContainer: {
    paddingTop: 60,
    paddingBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#145DA0",
    gap: 20,
    borderBottomLeftRadius: 250, // 👈 add this
    borderBottomRightRadius: 250,
    width: 600, // 👈 add this
    alignSelf: "center", // 👈 add this
    marginBottom: 80,
  },

  logoImageContainer: {
    // alignItems: "center",
  },

  logoImage: {
    width: 100, // your desired width
    height: 100, // your desired height
    resizeMode: "contain", // optional to keep aspect ratio
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
    // borderRadius: 0,
  },

  eyeIcon: {
    marginRight: 20,
    marginTop: 10,
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: 100,
  },

  forgotPasswordContainer: {
    alignItems: "center", // centers horizontally
    justifyContent: "center", // centers vertically if needed
  },

  forgotPassword: {
    textAlign: "center",
  },
});
