import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
     

      <div
        className="dashboard-content"
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              display: "inline-block",
              fontSize: "2.2rem",
              fontFamily: "'Segoe UI', sans-serif",
              color: "#333",
              borderBottom: "3px solid #E2215F",
              paddingBottom: "6px",
              fontWeight: "600",
            }}
          >
            Analytics
          </h2>
        </div>

        {/* Stats Cards */}
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
          }}
        >
          {[
            { title: "Total Users", value: "1,250" },
            { title: "Total Events", value: "340" },
            { title: "Pending Requests", value: "28" },
            { title: "Approved Requests", value: "312" },
          ].map((stat, index) => (
            <div
              key={index}
              className="stat-card"
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  color: "#E2215F",
                  marginBottom: "10px",
                  fontWeight: "600",
                  fontFamily: "'Segoe UI', sans-serif",
                }}
              >
                {stat.title}
              </h3>
              <p
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
