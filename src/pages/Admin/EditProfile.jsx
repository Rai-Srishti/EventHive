import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "admin@example.com",
    phone: "9876543210",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Normally, update the data in DB here
    console.log("Updated data:", formData);
    navigate("/admin/profile"); // Go back to profile page
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
        fontWeight: "600"}}>Edit Profile</h2></div>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>City</label>
            <input name="city" value={formData.city} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>State</label>
            <input name="state" value={formData.state} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input name="country" value={formData.country} onChange={handleChange} />
          </div>

          <div className="form-btn-group">
            <button className="save-btn" type="submit">Save</button>
            <button className="cancel-btn" type="button" onClick={() => navigate("/admin/profile")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;