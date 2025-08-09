import React from "react";

export function WebButton({ style, children, onClick, ...props }) {
  const defaultStyle = {
    backgroundColor: "#145DA0",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  const combinedStyle = {
    ...defaultStyle,
    ...style,
  };

  return (
    <button onClick={onClick} style={combinedStyle} {...props}>
      {children}
    </button>
  );
}
