import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { UserProvider } from "./contexts/UserContext";
import Login from "../mobile/screens/Login.js"; //
import Welcome from "../mobile/screens/Welcome.js";
import SignUp from "../mobile/screens/SignUp.js";
import Profile from "../mobile/screens/Profile.js";
import Appointments from "../mobile/screens/Appointments.js";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
// Screens
// import Welcome from "./screens/Welcome";
// import Login from "./screens/Login";
// import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import EditProfile from "./screens/EditProfile";
import ViewStudentCard from "./screens/ViewStudentCard";
import ReportCard from "./screens/ReportCard";
import NotificationsCenter from "./screens/NotificationsCenter";
import PrintPages from "./screens/PrintPages";
import PrintingCredits from "./screens/PrintingCredits";
import CreatePassword from "./screens/CreatePassword.js";
import CardAppointmentScreen from "./screens/Appointments.js";


const theme = {
  ...DefaultTheme,
  roundness: 10,
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer screens (main app)
function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="ViewStudentCard" component={ViewStudentCard} />
      <Drawer.Screen name="ReportCard" component={ReportCard} />
      <Drawer.Screen name="NotificationsCenter" component={NotificationsCenter} />
      <Drawer.Screen name="Appointments" component={Appointments} />
      <Drawer.Screen name="PrintPages" component={PrintPages} />
      <Drawer.Screen name="PrintingCredits" component={PrintingCredits} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="MainDrawer"
                screenOptions={{ headerShown: false }}
              >
                {/* Auth screens (disabled for now) */}
                {/* <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} /> */}

                {/* Main app inside Drawer */}
                <Stack.Screen name="MainDrawer" component={MainDrawer} />
                  
                  {/* } <Stack.Screen name="Welcome" component={Welcome} /> */}
              {/*<Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="CreatePassword" component={CreatePassword} />
              <Stack.Screen name="Appointments" component={Appointments} /> */}

              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen
                name="ViewStudentCard"
                component={ViewStudentCard}
              />
              <Stack.Screen name="ReportCard" component={ReportCard} />
              <Stack.Screen
                name="NotificationsCenter"
                component={NotificationsCenter}
              />
              </Stack.Navigator>
              <StatusBar style="dark" />
            </NavigationContainer>
          </View>
        </SafeAreaProvider>
      </PaperProvider>
    </UserProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2F2",
  },
});
