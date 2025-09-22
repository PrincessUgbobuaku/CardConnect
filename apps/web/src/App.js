// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotificationCenter from "./screens/NotificationsCenter";
import ViewCard from "./screens/ViewCard";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import TestViewCard from "./screens/testing/TestViewCard";
import TestNotificationCenter from "./screens/testing/TestNotificationCenter";

import "./App.css";

function App() {
  const [isSideNavActive, setIsSideNavActive] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavActive(!isSideNavActive);
  };

  const closeSideNav = () => {
    setIsSideNavActive(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Unified Routes - Components adapt based on user role */}
          <Route
            path="/notifications"
            element={
              <NotificationCenter
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />
          <Route
            path="/virtual-card"
            element={
              <ViewCard
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Login />} />

          {/* Redirect any old routes to the new unified ones */}
          <Route
            path="/user-card"
            element={
              <ViewCard
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />
          <Route
            path="/user-notifications"
            element={
              <NotificationCenter
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />

          {/* ---------------------------------------------
            Temporary test route for ViewCard component.
            Renders the TestViewCard component using mock data
            to simulate user information without backend integration.
            Useful for UI/UX testing and layout adjustments.
            --------------------------------------------- */}
          <Route
            path="/test-viewcard"
            element={
              <TestViewCard
                isSideNavActive={isSideNavActive}
                toggleSideNav={toggleSideNav}
                closeSideNav={closeSideNav}
              />
            }
          />

          {/* ---------------------------------------------
            Temporary test route for Notifications component.
            Renders the TestNotificationCenter component using mock data
            to simulate user information without backend integration.
            Useful for UI/UX testing and layout adjustments.
            --------------------------------------------- */}
          <Route
            path="/test-notifications"
            element={<TestNotificationCenter />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
