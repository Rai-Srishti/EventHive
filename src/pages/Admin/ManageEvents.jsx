import React from "react";
import "./ManageRequest.css";
import { useNavigate } from "react-router-dom";

const ManageEvents = () => {
  const navigate = useNavigate(); 

  const events = [
    {
      id: 1001,
      date: "2025-08-10",
      cost: 1500,
      artist: "Arijit Singh",
      address: "Pune Stadium, Pune",
      host: "MusicMania",
    },
    {
      id: 1002,
      date: "2025-09-05",
      cost: 500,
      artist: "Tech Guru",
      address: "MIT Auditorium, Mumbai",
      host: "TechX",
    },
    {
      id: 1003,
      date: "2025-10-15",
      cost: 1200,
      artist: "Nucleya",
      address: "Delhi Arena, Delhi",
      host: "BassNation",
    },
  ];

  const handleEdit = (eventId) => {
    navigate(`/admin/events/edit/${eventId}`);
  };

  return (
    <div className="manage-request-container">
      <div className="manage-request-content">
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: "2rem",
            fontWeight: "700",
            color: "#000",
            display: "inline-block",
            borderBottom: "3px solid #E2215F",
            paddingBottom: "4px",
            marginBottom: "1.5rem"
            }}
            >
            Manage Events
          </h1>
        </div>
        <table className="manage-request-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Artist</th>
              <th>Address</th>
              <th>Host Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-label="Event ID">{event.id}</td>
                <td data-label="Date">{event.date}</td>
                <td data-label="Cost">₹{event.cost}</td>
                <td data-label="Artist">{event.artist}</td>
                <td data-label="Address">{event.address}</td>
                <td data-label="Host Name">{event.host}</td>
                <td data-label="Actions">
                  <button
                    className="button-approve"
                    style={{ marginRight: '8px' }}
                    onClick={() => handleEdit(event.id)} // ✅ Edit button logic
                  >
                    Edit
                  </button>
                  <button className="button-reject">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
