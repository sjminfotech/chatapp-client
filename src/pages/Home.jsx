// src/pages/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Logout from "./Logout";

// inside your Home.jsx or Feed.jsx return:
<Logout />

const Home = () => {
  return (
    <div className="home-container">
      {/* Top Navbar */}
      <div className="top-navbar">
        <h2>ChatApp</h2>
      </div>

      {/* Feed Area */}
      <div className="feed-area">
        <p>Welcome to ChatApp!</p>
<Logout />
        {/* Placeholder for future posts */}
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <Link to="/home">🏠</Link>
        <Link to="/search">🔍</Link>
        <Link to="/create">➕</Link>
        <Link to="/profile">👤</Link>
      </div>
    </div>
  );
};

export default Home;
