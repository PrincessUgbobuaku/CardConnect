import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    // Load token and student info from AsyncStorage on mount
    const loadUser = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedStudentInfo = await AsyncStorage.getItem("studentInfo");
      if (storedToken) setToken(storedToken);
      if (storedStudentInfo) setStudentInfo(JSON.parse(storedStudentInfo));
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ token, setToken, studentInfo, setStudentInfo }}>
      {children}
    </UserContext.Provider>
  );
};
