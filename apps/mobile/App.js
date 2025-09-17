import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
// import Login from "../mobile/screens/Login.js"; //
// import Welcome from "../mobile/screens/Welcome.js";
// import SignUp from "../mobile/screens/SignUp.js";
// import Profile from "../mobile/screens/Profile.js";
// import Appointments from "../mobile/screens/Appointments.js";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
// import CreatePassword from "./screens/CreatePassword.js";
// import CardAppointmentScreen from "./screens/Appointments.js";
// import EditProfile from "./screens/EditProfile.js";
import Dashboard from "./screens/Dashboard.js";
import ViewStudentCard from "./screens/ViewStudentCard.js";
import ReportCard from "./screens/ReportCard.js";
import NotificationsCenter from "./screens/NotificationsCenter.js";

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
              initialRouteName="Dashboard"
              screenOptions={{ headerShown: false }}
            >

             {/* } <Stack.Screen name="Welcome" component={Welcome} /> */}
              {/*<Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="CreatePassword" component={CreatePassword} />
              <Stack.Screen name="Appointments" component={Appointments} /> */}

              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="ViewStudentCard" component={ViewStudentCard} />
              <Stack.Screen name="ReportCard" component={ReportCard} />
              <Stack.Screen name="NotificationsCenter" component={NotificationsCenter} />
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
