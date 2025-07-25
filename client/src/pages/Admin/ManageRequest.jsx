import React from "react";
import "../../assets/css/Admin/ManageRequest.css"; 

const ManageRequest = () => {
  return (
    <div className="manage-request-container">
      <div className="manage-request-content">
        <div style={{fontSize:"24px", fontWeight:"bold",marginBottom:"20px",textAlign: "center"}}>
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
            Manage Request
          </h1>
        </div>
        <table className="manage-request-table" >
          <thead >
            <tr> 
              <th>Name</th>
              <th>Email</th>
              <th>Event</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Name">John Doe</td>
              <td data-label="Email">john@example.com</td>
              <td data-label="Event">Music Fest</td>
              <td data-label="Status">Pending</td>
              <td data-label="Actions">
                <button className="button-approve" style={{ marginRight: '8px' }}>Approve</button>
                <button className="button-reject">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequest;
