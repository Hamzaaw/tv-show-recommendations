import React from "react";

const BackButton = ({ onBack }) => {
  return (
    <button 
      onClick={onBack} 
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        background: "transparent",  // No background
        border: "none",  // No border
        color: "#ffffff",  // White text
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      ← Back
    </button>
  );
};

export default BackButton;
