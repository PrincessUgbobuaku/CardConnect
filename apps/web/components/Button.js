import React from "react";
import { WebButton } from "./components/WebButton"; // ✅ correct import

function App() {
  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to CardConnect Web</h1>

      <WebButton onClick={() => alert("Welcome to the web!")}>
        Press Me
      </WebButton>
    </div>
  );
}

export default App;
