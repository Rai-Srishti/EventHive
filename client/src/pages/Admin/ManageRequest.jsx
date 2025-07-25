import React, { useState, useEffect } from "react";
import "../../assets/css/Admin/ManageRequest.css";

const ManageRequest = () => {
  const allRequests = [
    { id: 1, name: "John Doe", email: "john@example.com", event: "Music Fest", status: "Pending" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", event: "Tech Summit", status: "Approved" },
    { id: 3, name: "Bob Brown", email: "bob@example.com", event: "Art Expo", status: "Rejected" },
    { id: 4, name: "Alice Lee", email: "alice@example.com", event: "Wellness Retreat", status: "Pending" },
  ];

  const requestsPerPage = 10;
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = allRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * requestsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, startIndex + requestsPerPage);

  useEffect(() => {
    if (page > 0 && startIndex >= filteredRequests.length) {
      setPage(0);
    }
  }, [searchTerm, filteredRequests.length, page, startIndex]);

  const handleApprove = (id) => {
    console.log(`Request ID ${id} approved`);
  };

  const handleReject = (id) => {
    console.log(`Request ID ${id} rejected`);
  };

  const handlePrevious = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if ((page + 1) * requestsPerPage < filteredRequests.length) setPage(prev => prev + 1);
  };

  return (
    <div className="manage-request-container">
      <div className="manage-request-content">
        {/* Title */}
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
            Manage Request
          </h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar" style={{ marginBottom: "1rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by name..."
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

        {/* Table */}
        <table className="manage-request-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Event</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((request) => (
                <tr key={request.id}>
                  <td data-label="Name">{request.name}</td>
                  <td data-label="Email">{request.email}</td>
                  <td data-label="Event">{request.event}</td>
                  <td data-label="Status">{request.status}</td>
                  <td data-label="Actions">
                    <button
                      className="button-approve"
                      style={{ marginRight: "8px" }}
                      onClick={() => handleApprove(request.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="button-reject"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No requests found.</td>
              </tr>
            )}
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
