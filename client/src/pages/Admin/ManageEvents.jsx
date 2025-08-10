import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Toolbar,
  ExcelExport,
  Page,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { fetchApprovedEvents } from "../../services/adminService";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let gridRef = null;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchApprovedEvents();
        setEvents(data);
      } catch (error) {
        Swal.fire("Error", "Failed to load approved events.", "error");
      }
    };
    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.artist?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Edit button template
  const actionTemplate = (props) => (
    <button
      className="button-approve"
      style={{ marginRight: "8px" }}
      onClick={() => navigate(`/admin/events/edit/${props.eventId}`)}
    >
      Edit
    </button>
  );

  const toolbarOptions = ["ExcelExport"];
  const toolbarClick = (args) => {
    if (gridRef && args.item.id.includes("excelexport")) {
      gridRef.excelExport();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: "2rem",
            fontWeight: "700",
            color: "#000",
            display: "inline-block",
            borderBottom: "3px solid #E2215F",
            paddingBottom: "4px",
          }}
        >
          Manage Events
        </h1>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "10px", textAlign: "right" }}>
        <input
          type="text"
          placeholder="Search by artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <GridComponent
        dataSource={filteredEvents}
        allowSorting={true}
        allowPaging={true}
        pageSettings={{ pageSize: 10 }}
        toolbar={toolbarOptions}
        toolbarClick={toolbarClick}
        ref={(g) => (gridRef = g)}
        allowExcelExport={true}
        height={400}
      >
        <ColumnsDirective>
          <ColumnDirective field="eventId" headerText="Event ID" width="100" textAlign="Center" />
          <ColumnDirective field="eventDate" headerText="Date" width="110" textAlign="Center" format="yMd" type="date" />
          <ColumnDirective field="eventName" headerText="Event" width="150" textAlign="Center" />
          <ColumnDirective field="artist.name" headerText="Artist" width="130" textAlign="Center" template={(props) => props.artist?.name || "N/A"} />
          <ColumnDirective field="category" headerText="Category" width="130" textAlign="Center" />
          <ColumnDirective field="address" headerText="Address" width="180" textAlign="Center" template={(props) => `${props.address}, ${props.city}`} />
          <ColumnDirective field="firstName" headerText="Host Name" width="160" textAlign="Center" template={(props) => `${props.host?.firstName || ""} ${props.host?.lastName || ""}`} />
          <ColumnDirective headerText="Actions" width="150" textAlign="Center" template={actionTemplate} />
        </ColumnsDirective>
        <Inject services={[Sort, Toolbar, ExcelExport, Page]} />
      </GridComponent>

      {/* Pagination left align override */}
      <style>{`
        .e-pager.e-lib {
          justify-content: flex-start !important;
          padding-left: 0 !important;
        }
        .button-approve {
          background-color: #E2215F;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .button-approve:hover {
          background-color: #c51b51;
        }
      `}</style>
    </div>
  );
};

export default ManageEvents;
