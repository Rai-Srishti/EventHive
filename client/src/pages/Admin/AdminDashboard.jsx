
import React, { useEffect, useState } from "react";
import { fetchAdminDashboardStats } from "../../services/adminService";
import "../../assets/css/Admin/AdminDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalApprovedEvents: 0,
    totalPendingEvents: 0,
    totalRejectedEvents: 0,
    totalHosts: 0,
    totalAttendee: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await fetchAdminDashboardStats();
        setCounts(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchCounts();
  }, []);

  const totalEvents =
    counts.totalApprovedEvents +
    counts.totalPendingEvents +
    counts.totalRejectedEvents;

  const stats = [
    { title: "Total Users", value: counts.totalUsers },
    { title: "Total Events", value: totalEvents },
    { title: "Pending Requests", value: counts.totalPendingEvents },
    { title: "Approved Requests", value: counts.totalApprovedEvents },
    { title: "Rejected Requests", value: counts.totalRejectedEvents },
  ];

  const barChartData = [
    { name: "Pending", count: counts.totalPendingEvents },
    { name: "Approved", count: counts.totalApprovedEvents },
    { name: "Rejected", count: counts.totalRejectedEvents },
  ];

  const pieData = [
    { name: "Hosts", value: counts.totalHosts },
    { name: "Attendees", value: counts.totalAttendee },
  ];

  const COLORS = ["#6366F1", "#10B981"]; // Indigo, Emerald

  const renderCustomizedLabel = ({ percent }) =>
    `${(percent * 100).toFixed(0)}%`;

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
          {stats.map((stat, index) => (
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

        {/* Bar Chart */}
        <div style={{ marginTop: "50px" }}>
          <h3
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Event Status Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#E2215F" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{ marginTop: "50px" }}>
          <h3
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Hosts vs Attendees
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={renderCustomizedLabel}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
