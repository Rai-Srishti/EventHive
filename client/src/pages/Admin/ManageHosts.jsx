import React, { useState, useEffect } from "react";
import "../../assets/css/Admin/ManageRequest.css"; // Reuse same CSS

const ManageHosts = () => {
  const allHosts = [
    { id: 1, name: "Host A", email: "a@example.com", isBlocked: false },
    { id: 2, name: "Host B", email: "b@example.com", isBlocked: true },
    { id: 3, name: "Host C", email: "c@example.com", isBlocked: false },
    { id: 4, name: "Host D", email: "d@example.com", isBlocked: true },
    { id: 5, name: "Host E", email: "e@example.com", isBlocked: false },
    { id: 6, name: "Host F", email: "f@example.com", isBlocked: false },
  ];

  const hostsPerPage = 10;
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHosts = allHosts.filter(
    (host) =>
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * hostsPerPage;
  const currentHosts = filteredHosts.slice(startIndex, startIndex + hostsPerPage);

  useEffect(() => {
    if (page > 0 && startIndex >= filteredHosts.length) {
      setPage(0);
    }
  }, [searchTerm, filteredHosts.length, page, startIndex]);

  const handleBlockToggle = (id) => {
    // TODO: Add block/unblock logic
    console.log(`Toggled block for host ID ${id}`);
  };

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if ((page + 1) * hostsPerPage < filteredHosts.length)
      setPage((prev) => prev + 1);
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
            Manage Hosts
          </h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar" style={{ marginBottom: "1rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by name or email..."
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
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentHosts.length > 0 ? (
              currentHosts.map((host) => (
                <tr key={host.id}>
                  <td data-label="ID">{host.id}</td>
                  <td data-label="Name">{host.name}</td>
                  <td data-label="Email">{host.email}</td>
                  <td data-label="Actions">
                    <button
                      className={host.isBlocked ? "button-approve" : "button-reject"}
                      onClick={() => handleBlockToggle(host.id)}
                    >
                      {host.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No hosts found.</td>
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
            disabled={(page + 1) * hostsPerPage >= filteredHosts.length}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageHosts;
