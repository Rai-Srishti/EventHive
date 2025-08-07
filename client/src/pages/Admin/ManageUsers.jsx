import React, { useState, useEffect } from "react";
import "../../assets/css/Admin/ManageRequest.css";
import Swal from "sweetalert2";
import {
  fetchAllAttendees,
  blockAttendee,
  unblockAttendee,
  validateAttendee,
} from "../../services/adminService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attendees = await fetchAllAttendees();
        setUsers(attendees);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch attendees.", "error");
      }
    };
    fetchData();
  }, []);

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      const message = isBlocked
        ? await unblockAttendee(userId)
        : await blockAttendee(userId);

      await Swal.fire("Success", message, "success");

      const attendees = await fetchAllAttendees();
      setUsers(attendees);
    } catch (err) {
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  const handleValidate = async (userId) => {
    try {
      const message = await validateAttendee(userId);
      Swal.fire("Validation Result", message, "info");
    } catch (err) {
      Swal.fire("Error", "Validation failed. Try again later.", "error");
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  useEffect(() => {
    if (page > 0 && startIndex >= filteredUsers.length) {
      setPage(0);
    }
  }, [searchTerm, filteredUsers.length, page, startIndex]);

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
            placeholder="Search by name..."
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
              <th>Phone</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>{user.country}</td>
                  <td>
                    <button
                      className="button-info"
                      style={{ marginRight: "8px" }}
                      onClick={() => handleValidate(user.userId)}
                    >
                      Validate
                    </button>
                    <button
                      className={user.status === "BLOCKED" ? "button-approve" : "button-reject"}
                      onClick={() =>
                        handleBlockToggle(user.userId, user.status === "BLOCKED")
                      }
                    >
                      {user.status === "BLOCKED" ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
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
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
            className="pagination-btn"
          >
            Previous
          </button>
          <span>Page {page + 1}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
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
