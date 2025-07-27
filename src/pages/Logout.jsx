// Logout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove login state
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user"); // optional, if you store user data
    // Redirect to login
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
