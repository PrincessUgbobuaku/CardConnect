import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./.expo/screens/Login.js"; // Adjust the path if needed
import Welcome from "./.expo/screens/Welcome.js"; // Adjust the path if needed
import SignUp from "./.expo/screens/SignUp.js";
import Profile from "./.expo/screens/Profile.js"; // Adjust the path if needed
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 50,
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{ headerShown: false}}
            >
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} options={{title: "Login"}}/>
              <Stack.Screen name="SignUp" component={SignUp} options={{title: "SignUp"}}/>
              <Stack.Screen name="Profile" component={Profile} options={{title: "Profile"}}/>

              {/* <SafeAreaView style={styles.container}> */}
              {/* <Login /> */}

              {/* <Welcome /> */}
              {/* </SafeAreaView> */}
            </Stack.Navigator>
            <StatusBar style="dark" />
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2F2",
  },
});
