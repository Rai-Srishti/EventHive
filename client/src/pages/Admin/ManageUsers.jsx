import React from "react";
import "../../assets/css/Admin/ManageRequest.css"; // Reuse the same CSS for styling

const ManageUsers = () => {
  const users = [
    { id: 1, name: "User One", email: "user1@example.com", isBlocked: false },
    { id: 2, name: "User Two", email: "user2@example.com", isBlocked: true },
    { id: 3, name: "User Three", email: "user3@example.com", isBlocked: false },
  ];

  return (
    <div className="manage-request-container">
      <div className="manage-request-content">
        <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
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
            Manage Users
          </h1>
        </div>
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
            {users.map((user) => (
              <tr key={user.id}>
                <td data-label="ID">{user.id}</td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Actions">
                  {!user.isBlocked ? (
                    <button className="button-reject">Block</button>
                  ) : (
                    <button className="button-approve">Unblock</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;