import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/1.png")}
          style={styles.topImage}
          //style={styles.backgroundImage}
        />
      </View>

      <View style={styles.loginHeaderContainer}>
        <Text style={styles.loginText}>Log in to your CPUT Card Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter your student number"
        ></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter your password"
          secureTextEntry
        ></TextInput>
      </View>
      <Text style={styles.forgotPasswordText}>
        Forgot password? CLICK HERE.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2F2",
    width: "100%",
  },

  imageContainer: {
    //height: 200,
    width: "100%",
  },

  topImage: {
    width: "100%",
    height: 150,
  },

  loginHeaderContainer: {
    //borderWidth: 1,
    marginTop: 70,
  },

  loginText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "#000000",
  },

  inputContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 40,
    marginHorizontal: 40,
    marginVertical: 40,
    elevation: 10,
  },

  inputText: {
    flex: 1,
    marginLeft: 20,
    fontStyle: "italic",
  },

  forgotPasswordText: {
    textAlign: "center",
  },
  //   backgroundImage: {
  //     width: "100%",
  //     height: "100%",
  //     resizeMode: "cover",
  //   },
});
