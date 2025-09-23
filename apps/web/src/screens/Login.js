import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cardconnect-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with Email: ${email}`);
  };

  const containerStyle = {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const leftPanelStyle = {
    flex: 1,
    background: "#145DA0",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    textAlign: "center",
  };

  const rightPanelStyle = {
    flex: 1,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const formContainerStyle = {
    maxWidth: "400px",
    width: "100%",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#145DA0",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const linkStyle = {
    color: "#145DA0",
    textDecoration: "none",
  };

  const smallTextStyle = {
    fontSize: "14px",
    marginTop: "20px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      {/* Left Side */}
      <div style={leftPanelStyle}>
        <img
          src={logo}
          alt="Card Connect Logo"
          style={{
            width: "80px",
            height: "80px",
            marginBottom: "15px",
          }}
        />
        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
          Card Connect Login
        </h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>Secure Access Portal</p>
      </div>

      {/* Right Side */}
      <div style={rightPanelStyle}>
        <form style={formContainerStyle} onSubmit={handleSubmit}>
          <h2>Card Connect Login</h2>
          <p>Enter your credentials to sign in</p>

          <input
            type="email"
            placeholder="Enter your email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>

          <div style={smallTextStyle}>
            Don't have an account?{" "}
            <Link to="/signup" style={linkStyle}>
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
