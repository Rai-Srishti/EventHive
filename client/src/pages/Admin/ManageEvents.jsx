import React, { useEffect, useState } from "react";
import "../../assets/css/Admin/ManageRequest.css";
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

  const eventPerPage = 10;
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) =>
    event.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * eventPerPage;
  const currentEvent = filteredEvents.slice(
    startIndex,
    startIndex + eventPerPage
  );

  useEffect(() => {
    if (page > 0 && startIndex >= filteredEvents.length) {
      setPage(0);
    }
  }, [searchTerm, filteredEvents.length, page, startIndex]);

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if ((page + 1) * eventPerPage < filteredEvents.length)
      setPage((prev) => prev + 1);
  };

  const handleEdit = (eventId) => {
    navigate(`/admin/events/edit/${eventId}`);
  };

  const handleDelete = (eventId) => {
    // TODO: Implement deletion logic here
    console.log(`Event with ID ${eventId} deleted`);
  };

  return (
    <div className="manage-request-container">
      <div className="manage-request-content">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h1
            style={{
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: "2rem",
              fontWeight: "700",
              color: "#000",
              display: "inline-block",
              borderBottom: "3px solid #E2215F",
              paddingBottom: "4px",
              marginBottom: "1.5rem",
            }}
          >
            Manage Events
          </h1>
        </div>

        <div className="search-bar" style={{ marginBottom: "1rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by artist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px", width: "50%", borderRadius: "5px", border: "1px solid #fffdfdff" }}
          />
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
            {currentEvent.map((event) => (
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
                    style={{ marginRight: "8px" }}
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-reject"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={handlePrevious}
            disabled={page === 0}
            className="pagination-btn"
          >
            Previous
          </button>
          <span>Page {page + 1}</span>
          <button
            onClick={handleNext}
            disabled={(page + 1) * eventPerPage >= filteredEvents.length}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
