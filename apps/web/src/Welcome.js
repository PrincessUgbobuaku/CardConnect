import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/cardconnect-logo.png";

export default function Welcome() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #ddd",
  };

  const navStyle = {
    display: "flex",
    gap: "20px",
    fontSize: "14px",
  };

  const navLinkStyle = {
    color: "#145DA0",
    textDecoration: "none",
    fontWeight: "500",
  };

  const mainStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "40px 20px",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#145DA0",
  };

  const descStyle = {
    fontSize: "16px",
    maxWidth: "500px",
    marginBottom: "30px",
    color: "#333",
    lineHeight: "1.5",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "20px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: "20px",
    border: "2px solid #145DA0",
    background: "transparent",
    color: "#145DA0",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    fontSize: "12px",
    borderTop: "1px solid #ddd",
    color: "#555",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="Card Connect Logo"
            style={{ width: "40px", height: "40px" }}
          />
          <span style={{ fontWeight: "bold", fontSize: "18px", color: "#145DA0" }}>
            Card Connect
          </span>
        </div>
        <nav style={navStyle}>
          <a href="#" style={navLinkStyle}>
            About Us
          </a>
          <a href="#" style={navLinkStyle}>
            Contact
          </a>
        </nav>
      </header>

      {/* Main */}
      <main style={mainStyle}>
        <h1 style={titleStyle}>CARD CONNECT</h1>
        <p style={descStyle}>
          Welcome to the official student card portal — your gateway to managing
          your CPUT virtual card, appointments, printing credits, and more, all
          in one secure and convenient place.
        </p>
        <div style={buttonContainerStyle}>
          <Link to="/signup">
            <button style={buttonStyle}>Sign up</button>
          </Link>
          <Link to="/login">
            <button style={buttonStyle}>Log in</button>
          </Link>
           <Link to="/profile">
    <button style={buttonStyle}>View Profile</button>
  </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={footerStyle}>
        <div>©2025 CardConnect / All rights reserved</div>
        <a href="#" style={{ color: "#145DA0", textDecoration: "none" }}>
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}

