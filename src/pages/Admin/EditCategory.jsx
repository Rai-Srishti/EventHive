import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditEvent.css"; // Reuse your CSS or create a separate one if needed

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    id: "",
    categoryName: "",
    description: ""
  });

  useEffect(() => {
    if (!categoryData.categoryName) {
      // Dummy fetch logic
      const fetchedCategory = {
        id,
        categoryName: "Music Festival",
        description: "Large-scale music event featuring multiple artists and genres."
      };
      setCategoryData(fetchedCategory);
    }
  }, [id, categoryData.categoryName]);

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Category:", categoryData);
    navigate("/admin/categories");
  };
  

  return (
    <div className="edit-event-container">
      <div className="edit-event-box">
        <div style={{ textAlign: "center" }}>
      <h2
       className="profile-title"
        style={{
          display: "inline-block",
          fontFamily: "'Segoe UI', sans-serif",
          borderBottom: "3px solid #E2215F",
        paddingBottom: "4px",
        fontWeight: "600"}}>Edit Category</h2></div>

        <form onSubmit={handleSubmit} className="edit-event-form">
          <div className="form-group">
            <label>Category Name:</label>
            <input
              type="text"
              name="categoryName"
              value={categoryData.categoryName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={categoryData.description}
              onChange={handleChange}
              rows="4"
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
