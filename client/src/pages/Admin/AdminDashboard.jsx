import React, { useEffect, useState } from "react";
import { fetchAdminDashboardStats } from "../../services/adminService";
import "../../assets/css/Admin/AdminDashboard.css";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Tooltip,
  Legend,
  DataLabel,
} from "@syncfusion/ej2-react-charts";

// Chart imports for accumulation charts (Pie/Doughnut)
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationDataLabel,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";

// Syncfusion CSS
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
//import "@syncfusion/ej2-react-charts/styles/material.css";


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
    { title: "Total Attendee", value: counts.totalUsers },
    { title: "Total Events", value: totalEvents },
    { title: "Pending Requests", value: counts.totalPendingEvents },
    { title: "Approved Requests", value: counts.totalApprovedEvents },
    { title: "Rejected Requests", value: counts.totalRejectedEvents },
  ];

  const barChartData = [
    { status: "Pending", count: counts.totalPendingEvents },
    { status: "Approved", count: counts.totalApprovedEvents },
    { status: "Rejected", count: counts.totalRejectedEvents },
  ];

  const pieData = [
    { x: "Hosts", y: counts.totalHosts, text: `${counts.totalHosts}` },
    { x: "Attendees", y: counts.totalAttendee, text: `${counts.totalAttendee}` },
  ];

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

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
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

        {/* Column Chart */}
        <div style={{ marginTop: "50px" }}>
          <h3 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "20px" }}>
            Event Status Overview
          </h3>
          <ChartComponent
            primaryXAxis={{ valueType: "Category", title: "Status" }}
            primaryYAxis={{ title: "Count" }}
            tooltip={{ enable: true }}
            legendSettings={{ visible: false }}
            width="100%"
            height="300px"
          >
            <Inject services={[ColumnSeries, Tooltip, Legend, Category, DataLabel]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={barChartData}
                xName="status"
                yName="count"
                type="Column"
                fill="#E2215F"
                marker={{ dataLabel: { visible: true } }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>

        {/* Pie Chart */}
        <div style={{ marginTop: "50px" }}>
          <h3 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "20px" }}>
            Hosts vs Attendees
          </h3>
          <AccumulationChartComponent
            legendSettings={{ visible: true }}
            tooltip={{ enable: true }}
            width="100%"
            height="300px"
          >
            <Inject
              services={[
                PieSeries,
                AccumulationDataLabel,
                AccumulationLegend,
                AccumulationTooltip,
              ]}
            />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={pieData}
                xName="x"
                yName="y"
                type="Pie"
                dataLabel={{
                  visible: true,
                  position: "Inside",
                  name: "text",
                }}
              />
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


