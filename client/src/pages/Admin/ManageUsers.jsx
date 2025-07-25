import React, { useState, useEffect } from "react";
import "../../assets/css/Admin/ManageRequest.css";

const ManageUsers = () => {
  const usersList = [
    { id: 1, name: "User One", email: "user1@example.com", isBlocked: false },
    { id: 2, name: "User Two", email: "user2@example.com", isBlocked: true },
    { id: 3, name: "User Three", email: "user3@example.com", isBlocked: false },
    { id: 4, name: "User Four", email: "user4@example.com", isBlocked: false },
    { id: 5, name: "User Five", email: "user5@example.com", isBlocked: true },
    { id: 6, name: "User Six", email: "user6@example.com", isBlocked: false },
  ];

  const usersPerPage = 10;
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = usersList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  useEffect(() => {
    if (page > 0 && startIndex >= filteredUsers.length) {
      setPage(0);
    }
  }, [searchTerm, filteredUsers.length, page, startIndex]);

  const handleBlockToggle = (id) => {
    console.log(`Toggling block for user ID ${id}`);
    // Implement actual logic later
  };

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if ((page + 1) * usersPerPage < filteredUsers.length) setPage((prev) => prev + 1);
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
            Manage Users
          </h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar" style={{ marginBottom: "1rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by user name..."
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
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td data-label="User ID">{user.id}</td>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Actions">
                    <button
                      className={user.isBlocked ? "button-approve" : "button-reject"}
                      onClick={() => handleBlockToggle(user.id)}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No users found.
                </td>
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
            disabled={(page + 1) * usersPerPage >= filteredUsers.length}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
