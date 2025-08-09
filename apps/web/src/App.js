import React from "react";
import Welcome from "./screens/Welcome"; //import your welcome screen to be rendered
import Login from "./screens/Login"; //import your login screen to be rendered
import SignUp from "./screens/SignUp"; //import your login screen to be rendered
import { WebButton } from "./components/WebButton";

function App() {
  return (
    <div className="App">
      {/* View imported login interface */}
      <Login />

      {/* Displays button, comment it out */}
      <WebButton onClick={() => alert("Welcome to the web!")}>
        Press Me
      </WebButton>

      {/* Displays a wider button using props, comment it out */}

      <WebButton
        onClick={() => alert("Custom width!")}
        style={{ width: "500px" }} // 👈 Set width here
      >
        Wider Button
      </WebButton>
    </div>
  );
}

export default App;
