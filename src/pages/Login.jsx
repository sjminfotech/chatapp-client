import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ username: "", password: "" }); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      if (res.data.success) {
        localStorage.setItem("isLoggedIn", true);
        navigate("/home", { replace: true });
      } else {
        if (res.data.message === "Invalid username") {
          setError({ username: "Username is incorrect", password: "" });
        } else if (res.data.message === "Invalid password") {
          setError({ username: "", password: "Password is incorrect" });
        }
      }
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "30px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Email or Phone"
          value={form.username}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        {error.username && <p style={errorStyle}>{error.username}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        {error.password && <p style={errorStyle}>{error.password}</p>}

        <div style={{ textAlign: "right", marginBottom: "15px" }}>
          <Link to="/forgot-password" style={{ color: "#6c63ff", fontSize: "14px" }}>
            Forgot Password?
          </Link>
        </div>

        <button type="submit" style={buttonStyle}>
          LOGIN
        </button>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Not a member?{" "}
          <Link to="/signup" style={{ color: "#6c63ff", fontWeight: "bold" }}>
            Signup now
          </Link>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(to right, #56ccf2, #2f80ed)",
  border: "none",
  borderRadius: "6px",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  fontSize: "14px",
  marginBottom: "8px",
};

export default Login;
