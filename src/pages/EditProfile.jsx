import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.profileData || {};

  const [formData, setFormData] = useState(initialData);
  const [profileImage, setProfileImage] = useState(initialData?.profileImage || "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedData = { ...formData, profileImage };
    localStorage.setItem("profileData", JSON.stringify(updatedData));
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="edit-container">
      <h2>Edit Profile</h2>

      <div className="profile-image-section">
        <img src={profileImage || "/default-profile.png"} alt="Profile" className="profile-img" />
        <label className="change-photo-btn">
          Change photo
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>
      </div>

      <div className="form-group">
        <label>Website</label>
        <input type="text" name="website" value={formData.website || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Bio</label>
        <textarea name="about" rows="3" value={formData.about || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={formData.gender || ""} onChange={handleChange}>
          <option value="">Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="button-container">
        <button className="save-btn" onClick={handleSave}>Submit</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProfile;
