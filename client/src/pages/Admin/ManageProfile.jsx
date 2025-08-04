import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAdminProfile } from "../../services/adminService"; // You'll define this service
import "../../assets/css/Admin/Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchAdminProfile(); // API call to /admin/profile
        setAdminData(data);
      } catch (err) {
        alert("Failed to load profile");
      }
    };

    loadProfile();
    }, []);

  if (!adminData) return <p>Loading...</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div style={{ textAlign: "center" }}>
          <h2
            className="profile-title"
            style={{
              display: "inline-block",
              fontFamily: "'Segoe UI', sans-serif",
              borderBottom: "3px solid #E2215F",
              paddingBottom: "4px",
              fontWeight: "600",
            }}
          >
            Profile
          </h2>
        </div>

        <div className="profile-info">
          <span>First Name:</span>
          <p>{adminData.firstName}</p>
        </div>

        <div className="profile-info">
          <span>Last Name:</span>
          <p>{adminData.lastName}</p>
        </div>

        <div className="profile-info">
          <span>Email:</span>
          <p>{adminData.email}</p>
        </div>

        <div className="profile-info">
          <span>Phone:</span>
          <p>{adminData.phoneNumber}</p>
        </div>

        <div className="profile-info">
          <span>State:</span>
          <p>{adminData.state}</p>
        </div>

        <div className="profile-info">
          <span>Country:</span>
          <p>{adminData.country}</p>
        </div>

        <div className="profile-btn-container">
          <button
            className="edit-btn"
            onClick={() => navigate("/admin/edit-profile", { state: { adminData } })}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
