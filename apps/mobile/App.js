import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "../mobile/screens/Login.js";
import Welcome from "../mobile/screens/Welcome.js";
import SignUp from "../mobile/screens/SignUp.js";
import Profile from "../mobile/screens/Profile.js";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { CreditsProvider } from "./context/CreditsContext";
import PrintPagesScreen from "./screens/PrintPages.js";

const theme = {
  ...DefaultTheme,
  roundness: 5,
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CreditsProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="PrintPages"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="PrintPages" component={PrintPagesScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Profile" component={Profile} />
                {/* Future screens */}
                {/* <Stack.Screen name="LoadCredits" component={LoadCreditsScreen} /> */}
              </Stack.Navigator>
              <StatusBar style="dark" />
            </NavigationContainer>
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    </CreditsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2F2",
  },
});
