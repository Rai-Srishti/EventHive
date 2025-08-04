import React, { useEffect, useState } from "react";
import "../../assets/css/Admin/ManageRequest.css";
import { useNavigate } from "react-router-dom";
import { fetchApprovedEvents } from "../../services/adminService";

const ManageEvents = () => {
  const navigate = useNavigate();
  const eventsPerPage = 10;

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchApprovedEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error loading approved events", error);
      }
    };

    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.artist?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  useEffect(() => {
    if (page > 0 && startIndex >= filteredEvents.length) {
      setPage(0);
    }
  }, [searchTerm, filteredEvents.length, page, startIndex]);

  const handleEdit = (event) => {
  navigate(`/admin/events/edit/${event.eventId}`, { state: { event } });
  };

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if ((page + 1) * eventsPerPage < filteredEvents.length)
      setPage((prev) => prev + 1);
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

        {/* Search */}
        <div className="search-bar" style={{ marginBottom: "1rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by artist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              width: "50%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Table */}
        <table className="manage-request-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Date</th>
              <th>Event</th>
              <th>Artist</th>
              <th>Category</th>
              <th>Address</th>
              <th>Host Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <tr key={event.eventId}>
                  <td>{event.eventId}</td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>{event.eventName}</td>
                  <td>{event.artist?.name || "N/A"}</td>
                  <td>{event.category}</td>
                  <td>{event.address}, {event.city}</td>
                  <td>{event.host?.firstName} {event.host?.lastName}</td>
                  <td>
                    <button
                      className="button-approve"
                      style={{ marginRight: "8px" }}
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No approved events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <button onClick={handlePrevious} disabled={page === 0} className="pagination-btn">
            Previous
          </button>
          <span>Page {page + 1}</span>
          <button
            onClick={handleNext}
            disabled={(page + 1) * eventsPerPage >= filteredEvents.length}
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
