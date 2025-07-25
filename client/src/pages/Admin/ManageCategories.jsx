import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Admin/ManageRequest.css";

const ManageCategories = () => {
  const navigate = useNavigate();
  const allCategories = [
    { id: 101, name: "Music", description: "Concerts, DJ nights, and musical events" },
    { id: 102, name: "Technology", description: "Tech talks, hackathons, and workshops" },
    { id: 103, name: "Art & Culture", description: "Exhibitions, performances, and cultural shows" },
    { id: 104, name: "Health & Wellness", description: "Yoga, meditation, and wellness events" },
  ];

  const categoriesPerPage = 10;
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * categoriesPerPage;
  const currentCategories = filteredCategories.slice(startIndex, startIndex + categoriesPerPage);

  useEffect(() => {
    if (page > 0 && startIndex >= filteredCategories.length) {
      setPage(0);
    }
  }, [searchTerm, filteredCategories.length, page, startIndex]);

  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`);
  };

  const handleDelete = (id) => {
    // TODO: Add deletion logic
    console.log(`Category with ID ${id} deleted`);
  };

  const handlePrevious = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if ((page + 1) * categoriesPerPage < filteredCategories.length)
      setPage(prev => prev + 1);
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
            Manage Categories
          </h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar" style={{ marginBottom: "1rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by category..."
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
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category) => (
                <tr key={category.id}>
                  <td data-label="Event ID">{category.id}</td>
                  <td data-label="Category">{category.name}</td>
                  <td data-label="Description">{category.description}</td>
                  <td data-label="Actions">
                    <button
                      className="button-approve"
                      style={{ marginRight: "8px" }}
                      onClick={() => handleEdit(category.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="button-reject"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No categories found.</td>
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
            disabled={(page + 1) * categoriesPerPage >= filteredCategories.length}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;