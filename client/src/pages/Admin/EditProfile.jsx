import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/Admin/EditProfile.css";
import { updateAdminProfile } from "../../services/adminService";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminData = location.state?.adminData;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    state: "",
    country: ""
  });

  useEffect(() => {
    if (adminData) {
      setFormData(adminData);
    }
  }, [adminData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
  e.preventDefault();

  try {
    const message = await updateAdminProfile(formData);
    alert(message);
    navigate("/admin/profile");
  } catch (err) {
    alert("Failed to update profile.");
    console.error(err);
  }
  };

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-card">
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
            Edit Profile
          </h2>
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="form-btn-group">
            <button className="save-btn" type="submit">
              Save
            </button>
            <button
              className="cancel-btn"
              type="button"
              onClick={() => navigate("/admin/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
