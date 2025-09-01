import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "../mobile/screens/Login.js"; // Adjust the path if needed
import Welcome from "../mobile/screens/Welcome.js"; // Adjust the path if needed
import SignUp from "../mobile/screens/SignUp.js"; // Adjust the path if needed
import Profile from "../mobile/screens/Profile.js"; // Adjust the path if needed
import Appointments from "../mobile/screens/Appointments.js"; // Adjust the path if needed
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import CardAppointmentScreen from "./screens/Appointments.js";

const theme = {
  ...DefaultTheme,
  roundness: 10,
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
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Welcome" component={Login} />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: "Login" }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: "SignUp" }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ title: "Profile" }}
              />

              <Stack.Screen
                name="Appointments"
                component={Appointments}
                options={{ title: "Appointments" }}
              />

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
