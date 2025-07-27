import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError(""); // clear previous error
    try {
      const res = await fetch(
  `http://localhost:5000/api/users/search?query=${searchTerm}`
);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Something went wrong");
      }

      const data = await res.json();

      // Ensure data is always an array
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
        setError("No users found.");
      }
    } catch (error) {
      setError("Error: " + error.message);
      setUsers([]); // Clear results
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/viewprofile/${userId}`);
  };

  return (
    <div style={{ padding: "20px", background: "#111", color: "#fff", minHeight: "100vh" }}>
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "none",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          background: "#ff3c78",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {/* Show error */}
      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}

      <div style={{ marginTop: "30px" }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              background: "#222",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h4>{user.username}</h4>
              <p style={{ color: "#aaa" }}>{user.email}</p>
            </div>
            <button
              onClick={() => handleViewProfile(user._id)}
              style={{
                padding: "8px 16px",
                background: "#0f9d58",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
