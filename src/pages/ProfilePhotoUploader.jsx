import React, { useRef, useState } from "react";
import "./profileUpload.css";

const ProfilePhotoUploader = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-photo-section">
      <div className="profile-info">
        <div
          className="profile-image-wrapper"
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={preview || "/default-profile.png"}
            alt="Profile"
            className="profile-image"
          />
          <span className="change-label">Change profile</span>
        </div>
        <div className="user-details">
          <h3 className="username">sjm.infotech</h3>
          <p className="fullname">Sjm Infotech</p>
        </div>
      </div>

      <button
        className="change-photo-btn"
        onClick={() => fileInputRef.current.click()}
      >
        Change photo
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        hidden
      />
    </div>
  );
};

export default ProfilePhotoUploader;
