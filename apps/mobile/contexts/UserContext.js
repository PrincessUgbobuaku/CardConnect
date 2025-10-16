import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    // Load studentId from AsyncStorage on mount
    const loadStudentId = async () => {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId) setStudentId(storedId);
    };
    loadStudentId();
  }, []);

  return (
    <UserContext.Provider value={{ studentId, setStudentId }}>
      {children}
    </UserContext.Provider>
  );
};
