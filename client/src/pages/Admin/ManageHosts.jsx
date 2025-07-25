import React from "react";
import "../../assets/css/Admin/ManageRequest.css"; // Reuse same CSS for consistent styling

const ManageHosts = () => {
  const hosts = [
    { id: 1, name: "Host A", email: "a@example.com", isBlocked: false },
    { id: 2, name: "Host B", email: "b@example.com", isBlocked: true },
    { id: 3, name: "Host C", email: "c@example.com", isBlocked: false },
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
            Manage Hosts
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
            {hosts.map((host) => (
              <tr key={host.id}>
                <td data-label="ID">{host.id}</td>
                <td data-label="Name">{host.name}</td>
                <td data-label="Email">{host.email}</td>
                <td data-label="Actions">
                  {!host.isBlocked ? (
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

export default ManageHosts;
