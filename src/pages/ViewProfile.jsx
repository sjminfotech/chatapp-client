import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`);
        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p style={styles.loading}>Loading Profile...</p>;
  if (!user) return <p style={styles.error}>User not found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.profileWrapper}>
        <img
          src={user.profileImage && user.profileImage !== "" ? user.profileImage : "/default.png"}
          alt="Profile"
          style={styles.profileImage}
        />
      </div>
      <h2 style={styles.username}>@{user.username}</h2>
      <h3 style={styles.name}>{user.name}</h3>
      <p style={styles.bio}>{user.bio || "No bio provided."}</p>
      <div style={styles.stats}>
        <div style={styles.statBox}>
          <strong>{user.posts?.length || 0}</strong>
          <span>Posts</span>
        </div>
        <div style={styles.statBox}>
          <strong>{user.followers?.length || 0}</strong>
          <span>Followers</span>
        </div>
        <div style={styles.statBox}>
          <strong>{user.following?.length || 0}</strong>
          <span>Following</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "15px",
    backgroundColor: "#111",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  loading: {
    textAlign: "center",
    marginTop: "40px",
    color: "#fff",
  },
  error: {
    textAlign: "center",
    marginTop: "40px",
    color: "red",
  },
  profileWrapper: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 15px",
    border: "2px solid #fff",
    backgroundColor: "#333",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  username: {
    margin: "10px 0 0",
    fontSize: "20px",
    color: "#00ffff",
  },
  name: {
    margin: "5px 0",
    fontSize: "18px",
    color: "#fff",
  },
  bio: {
    fontStyle: "italic",
    marginBottom: "20px",
    color: "#ccc",
  },
  stats: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  statBox: {
    textAlign: "center",
  },
};

export default ViewProfile;
