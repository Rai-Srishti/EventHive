import React from "react";
import { useNavigate } from "react-router-dom";
import "./ManageRequest.css";

const ManageCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 101, name: "Music", description: "Concerts, DJ nights, and musical events" },
    { id: 102, name: "Technology", description: "Tech talks, hackathons, and workshops" },
    { id: 103, name: "Art & Culture", description: "Exhibitions, performances, and cultural shows" },
    { id: 104, name: "Health & Wellness", description: "Yoga, meditation, and wellness events" },
  ];

  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`);
  };

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
            Manage Categories
          </h1>
        </div>
        <table className="manage-request-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td data-label="Event ID">{category.id}</td>
                <td data-label="Category">{category.name}</td>
                <td data-label="Description">{category.description}</td>
                <td data-label="Actions">
                  <button
                    className="button-approve"
                    style={{ marginRight: '8px' }}
                    onClick={() => handleEdit(category.id)}
                  >
                    Edit
                  </button>
                  <button className="button-reject">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCategories;
