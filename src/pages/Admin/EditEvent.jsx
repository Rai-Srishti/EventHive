import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditEvent.css";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    id: "",
    date: "",
    cost: "",
    artist: "",
    address: "",
    host: "",
  });

  useEffect(() => {
    // Load dummy event only if not set
    if (!eventData.date) {
      const fetchedEvent = {
        id,
        date: "2025-08-10",
        cost: 1500,
        artist: "Arijit Singh",
        address: "Pune Stadium, Pune",
        host: "MusicMania",
      };
      setEventData(fetchedEvent);
    }
  }, [id, eventData.date]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Event:", eventData);
    navigate("/admin/events");
  };

  return (
    <div className="edit-event-container">
      <div className="edit-event-box">
        <div style={{ textAlign: "center" }}>
      <h2
       className="profile-title"
        style={{
          display: "inline-block",
          fontFamily: "'Segoe UI', sans-serif",
          borderBottom: "3px solid #E2215F",
        paddingBottom: "4px",
        fontWeight: "600"}}>Edit Event</h2></div>
        <form onSubmit={handleSubmit} className="edit-event-form">
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Cost:</label>
            <input type="number" name="cost" value={eventData.cost} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Artist:</label>
            <input type="text" name="artist" value={eventData.artist} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={eventData.address} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Host:</label>
            <input type="text" name="host" value={eventData.host} onChange={handleChange} required />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
