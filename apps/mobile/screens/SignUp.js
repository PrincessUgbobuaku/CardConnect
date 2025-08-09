import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Image, Linking } from "react-native";
import { Text as PaperText } from "react-native-paper";
import { TextInput as PaperInput } from "react-native-paper";
import { Checkbox as PaperCheckBox } from "react-native-paper";
import { useState } from "react";
import ConsentCheckboxes from "../components/Checkbox.js";
import { AppButton } from "../components/MobileButton.js";
import AppTextInput from "../components/TextInput.js";

export default function SignUp() {
  const [password, setPassword] = useState(""); //Stores the password typed by the user.
  const [secureText, setSecureText] = useState(true); // Controls visibility of password (true or false)

  const [consentChecked, setConsentChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const [studentNumber, setStudentNumber] = useState("");

  return (
    <View style={styles.signUpContainer}>
      <StatusBar style="dark" />

      {/* top image */}
      {/* <View style={styles.signUpImageContainer}>
        <Image
          source={require("../../assets/blue-background-top.png")}
          style={styles.topImage}
          //style={styles.backgroundImage}
        />
      </View> */}
      <View style={styles.signUpHeaderContainer}>
        <View style={styles.logoImageContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />
        </View>
        <View>
          <PaperText variant="headlineMedium" style={styles.signUpText}>
            Sign up for your CPUT Card Account{" "}
          </PaperText>
        </View>
        <View>
          <PaperText>Secure Access Portal</PaperText>
        </View>
      </View>
      {/* <View style={styles.signUpHeaderContainer}>
        <ScreenHeader text="Sign up for your CPUT Card Account" />
      </View> */}

      <View style={styles.inputContainer}>
        <AppTextInput
          label="Student number"
          placeholder="Enter your student number"
          value={studentNumber}
          onChangeText={setStudentNumber}
          style={styles.inputText}
        />
        <AppTextInput
          label="ID/Passport Number"
          placeholder="Enter your SA ID or passport no."
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          style={styles.inputText}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <ConsentCheckboxes
          consentChecked={consentChecked}
          setConsentChecked={setConsentChecked}
          privacyChecked={privacyChecked}
          setPrivacyChecked={setPrivacyChecked}
        />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton style={[{ width: "282" }]}>
          Verify me as a CPUT student
        </AppButton>
      </View>

      <View style={styles.verifiedStudentContainer}>
        <PaperText variant="bodyMedium" style={styles.verifiedStudent}>
          Already a verified student?{" "}
          <PaperText variant="bodyMedium" style={styles.bottomImage}>
            LOGIN
          </PaperText>
        </PaperText>
      </View>

      {/* <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/blue-background-bottom.png")}
          // style={styles.bottomImage}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    backgroundColor: "#F5F2F2",
    width: "100%",
  },

  signUpHeaderContainer: {
    paddingTop: 60,
    paddingBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#145DA0",
    gap: 20,
    // borderBottomLeftRadius: 250, // 👈 add this
    // borderBottomRightRadius: 250,
    width: 600, // 👈 add this
    alignSelf: "center", // 👈 add this
    marginBottom: 60,
    elevation: 20,
  },

  logoImageContainer: {
    // alignItems: "center",
  },

  logoImage: {
    width: 100, // your desired width
    height: 100, // your desired height
    resizeMode: "contain", // optional to keep aspect ratio
  },

  signUpText: {
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

  // signUpImageContainer: {
  //   width: "100%",
  //   marginBottom: 30,
  // },

  // signUpHeaderContainer: {
  //   marginBottom: 40,
  // },

  // topImage: {
  //   width: "100%",
  //   height: 150,
  // },

  // signUpText: {
  //   textAlign: "center",
  //   paddingLeft: 60,
  //   paddingRight: 60,
  //   fontWeight: "700",
  //   color: "#000000",
  // },

  inputContainer: {
    // paddingLeft: 35,
    // paddingRight: 35,
    gap: 40,
    marginBottom: 50,
    alignItems: "center",
  },

  inputText: {
    width: "80%",
  },

  checkboxContainer: {
    // paddingLeft: 35,
    // paddingRight: 35,
    // gap: 80,
    marginBottom: 30,
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: 60,
  },

  verifiedStudentContainer: {
    alignItems: "center", // centers horizontally
    justifyContent: "center", // centers vertically if needed
    // marginBottom: 20,
  },

  verifiedStudent: {
    textAlign: "center",
  },
});
