
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/cardconnect-logo.png";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user found
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    // You can also add a loading spinner here
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
  };

  const sidebarStyle = {
    width: "220px",
    backgroundColor: "#fff",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const sidebarTopStyle = {
    padding: "20px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
  };

  const logoStyle = {
    width: "60px",
    height: "60px",
    marginBottom: "10px",
  };

  const navStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const navItemStyle = {
    padding: "15px 20px",
    textDecoration: "none",
    color: "#145DA0",
    borderBottom: "1px solid #eee",
    fontWeight: "500",
  };

  const logoutStyle = {
    padding: "15px 20px",
    textDecoration: "none",
    color: "#d9534f",
    borderTop: "1px solid #ddd",
    fontWeight: "500",
    cursor: "pointer",
  };

  const topBarStyle = {
    height: "60px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 20px",
  };

  const profileHeaderStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
  };

  const profilePicStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    marginBottom: "15px",
    display: "inline-block",
  };

  const editButtonStyle = {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #145DA0",
    background: "transparent",
    color: "#145DA0",
    cursor: "pointer",
    fontSize: "14px",
  };

  const infoContainerStyle = {
    display: "flex",
    padding: "30px",
    gap: "40px",
    backgroundColor: "#fff",
    marginTop: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxWidth: "900px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const infoBlockStyle = {
    flex: 1,
  };

  const infoTitleStyle = {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "15px",
    color: "#145DA0",
  };

  const infoItemStyle = {
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div>
          <div style={sidebarTopStyle}>
            <img src={logo} alt="Card Connect Logo" style={logoStyle} />
            <h3 style={{ color: "#145DA0", fontSize: "16px", margin: "0" }}>CARD CONNECT</h3>
          </div>
          <nav style={navStyle}>
            <Link to="#" style={navItemStyle}>DASHBOARD</Link>
            <Link to="#" style={navItemStyle}>PROFILE</Link>
            <Link to="#" style={navItemStyle}>SETTINGS</Link>
            <Link to="#" style={navItemStyle}>NOTIFICATIONS CENTER</Link>
            <Link to="#" style={navItemStyle}>VIEW VIRTUAL CARD</Link>
          </nav>
        </div>
        <button onClick={handleLogout} style={logoutStyle}>LOG OUT</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Top Bar */}
        <div style={topBarStyle}>
          <span style={{ marginRight: "15px", fontWeight: "500" }}>
            {user.firstName} {user.lastName}
          </span>
        </div>

        {/* Profile Header */}
        <div style={profileHeaderStyle}>
          <div style={profilePicStyle}></div>
          <h2 style={{ margin: "5px 0" }}>
            {user.firstName} {user.lastName}
          </h2>
          <p style={{ margin: "0", color: "#888" }}>{user.userId || "—"}</p>
          <button style={editButtonStyle}>Edit profile</button>
        </div>

        {/* Info Sections */}
        <div style={infoContainerStyle}>
          <div style={infoBlockStyle}>
            <h3 style={infoTitleStyle}>Personal Information</h3>
            <p style={infoItemStyle}><strong>Email:</strong> {user.email}</p>
            <p style={infoItemStyle}><strong>Phone:</strong> {user.contactNumber}</p>
          </div>
          <div style={infoBlockStyle}>
            <h3 style={infoTitleStyle}>Account Information</h3>
            <p style={infoItemStyle}><strong>Role:</strong> {user.role || "Administrator"}</p>
            <p style={infoItemStyle}><strong>Card Status:</strong> Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
