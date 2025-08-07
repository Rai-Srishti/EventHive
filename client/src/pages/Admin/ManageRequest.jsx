import React, { useState, useEffect } from "react";
import "../../assets/css/Admin/ManageRequest.css";
import { fetchPendingEvents, approveEvent } from "../../services/adminService";
import Swal from "sweetalert2";

const ManageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const requestsPerPage = 10;

  useEffect(() => {
    loadPendingEvents();
  }, []);

  const loadPendingEvents = async () => {
    try {
      const data = await fetchPendingEvents();
      setRequests(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  const handleApprove = async (eventId) => {
    try {
      const message = await approveEvent(eventId);

      if (message.toLowerCase().includes("rejected")) {
        Swal.fire({
          icon: "error",
          title: "Event Rejected",
          text: message,
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Event Approved",
          text: message,
          confirmButtonColor: "#3085d6",
        });

        const updatedRequests = requests.filter((event) => event.eventId !== eventId);
        setRequests(updatedRequests);

        const filtered = updatedRequests.filter((event) =>
          event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const totalPages = Math.ceil(filtered.length / requestsPerPage);

        if (page >= totalPages && totalPages > 0) {
          setPage(totalPages - 1);
        }
      }
    } catch (err) {
      const fallbackMessage = err.response?.data?.message || "Error approving event.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: fallbackMessage,
      });
    }
  };

  const handleReject = (eventId) => {
    alert(`Event ID ${eventId} rejected (functionality not implemented)`);
  };

  const filteredRequests = requests.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * requestsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, startIndex + requestsPerPage);

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if ((page + 1) * requestsPerPage < filteredRequests.length) setPage((prev) => prev + 1);
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
            Manage Pending Events
          </h1>
        </div>

        <div className="search-bar" style={{ marginBottom: "1rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by event name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              width: "40%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        <table className="manage-request-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Host</th>
              <th>Artist</th>
              <th>Date</th>
              <th>City</th>
              <th>Address</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((event) => (
                <tr key={event.eventId}>
                  <td data-label="Event Name">{event.eventName}</td>
                  <td data-label="Host">{event.host?.firstName}</td>
                  <td data-label="Artist">{event.artist?.name}</td>
                  <td data-label="Date">{new Date(event.eventDate).toLocaleString()}</td>
                  <td data-label="City">{event.city}</td>
                  <td data-label="Address">{event.address}</td>
                  <td data-label="Category">{event.category}</td>
                  <td data-label="Actions">
                    <button
                      className="button-approve"
                      style={{ marginRight: "8px" }}
                      onClick={() => handleApprove(event.eventId)}
                    >
                      Validate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No pending events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button onClick={handlePrevious} disabled={page === 0} className="pagination-btn">
            Previous
          </button>
          <span>Page {page + 1}</span>
          <button
            onClick={handleNext}
            disabled={(page + 1) * requestsPerPage >= filteredRequests.length}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRequest;
