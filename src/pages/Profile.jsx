import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { BsGrid3X3GapFill, BsBookmarkFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "SJM Infotech",
    about: "SJM Infotech | IT Solutions",
    service: "Web Design • App Dev • Marketing",
    email: "enquiry.sjm@gmail.com",
    phone: "9528285735",
    website: "https://sjminfotech.com",
    profileImage: null,
  });

  const [postCount, setPostCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }

    // Fetch post count
    fetch("http://localhost:5000/api/posts/myposts")
      .then((res) => res.json())
      .then((data) => setPostCount(data.length));

    // Fetch followers
    fetch("http://localhost:5000/api/users/followers")
      .then((res) => res.json())
      .then((data) => setFollowers(data));

    // Fetch following
    fetch("http://localhost:5000/api/users/following")
      .then((res) => res.json())
      .then((data) => setFollowing(data));
  }, []);

  const handleEdit = () => {
    navigate("/edit-profile", { state: { profileData } });
  };

  const goBack = () => {
    navigate("/home");
  };

  return (
    <div className="profile-container">
      <div className="back-icon" onClick={goBack}>
        <IoArrowBack size={24} />
      </div>

      <div className="profile-card">
        <div className="profile-pic-container">
          {profileData.profileImage ? (
            <img src={profileData.profileImage} alt="Profile" className="profile-pic" />
          ) : (
            <img src="/default.jpg" alt="Default" className="profile-pic" />
          )}
        </div>

        <div className="profile-stats">
          <div><strong>{postCount}</strong> posts</div>
          <div><strong>{followers.length}</strong> followers</div>
          <div><strong>{following.length}</strong> following</div>
        </div>

        <h2 className="profile-name">{profileData.name}</h2>
        <p className="profile-about">{profileData.about}</p>
        <p className="profile-service">{profileData.service}</p>

        <div className="profile-info">
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Phone:</strong> {profileData.phone}</p>
          <p><strong>Website:</strong> <a href={profileData.website} target="_blank" rel="noreferrer">{profileData.website}</a></p>
        </div>

        <button onClick={handleEdit} className="edit-button">Edit Profile</button>

        {/* Future Feature Icons */}
        <div className="future-icons">
          <BsGrid3X3GapFill className="icon" title="Posts" />
          <FaVideo className="icon" title="Reels" />
          <BsBookmarkFill className="icon" title="Saved" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
