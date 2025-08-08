import React, { useState, useEffect } from "react";
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

import { fetchPendingEvents, approveEvent } from "../../services/adminService";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";

const ManageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let gridRef = null;

  useEffect(() => {
    loadPendingEvents();
  }, []);

  const loadPendingEvents = async () => {
    try {
      const data = await fetchPendingEvents();
      setRequests(data);
    } catch (error) {
      console.error("Failed to load events:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load pending events.",
      });
    }
  };

  const handleApprove = async (eventId) => {
    try {
      const message = await approveEvent(eventId);
      if (message.toLowerCase().includes("rejected")) {
        Swal.fire({
          icon: "error",
          title: "Event Rejected",
          text: message,
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Event Approved",
          text: message,
          confirmButtonColor: "#3085d6",
        });
        loadPendingEvents(); // reload list after approval
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error approving event.",
      });
    }
  };

  const toolbarOptions = ["ExcelExport"];

  const toolbarClick = (args) => {
    if (gridRef && args.item.id.includes("excelexport")) {
      gridRef.excelExport();
    }
  };

  // Filter requests based on search term (case-insensitive)
  const filteredRequests = requests.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Action button template for Grid
  const actionTemplate = (props) => (
    <button
      className="button-info"
      style={{ cursor: "pointer" }}
      onClick={() => handleApprove(props.eventId)}
    >
      Validate
    </button>
  );

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
          Manage Pending Events
        </h1>
      </div>

      {/* Search bar */}
      <div style={{ marginBottom: "10px", textAlign: "right" }}>
        <input
          type="text"
          placeholder="Search by event name..."
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
        dataSource={filteredRequests}
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
          <ColumnDirective
            field="eventName"
            headerText="Event Name"
            width="150"
            textAlign="Center"
          />
          <ColumnDirective
            field="host.firstName"
            headerText="Host"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            field="artist.name"
            headerText="Artist"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            field="eventDate"
            headerText="Date"
            width="150"
            textAlign="Center"
            type="date"
            format="yMd"
          />
          <ColumnDirective
            field="city"
            headerText="City"
            width="100"
            textAlign="Center"
          />
          <ColumnDirective
            field="address"
            headerText="Address"
            width="150"
            textAlign="Center"
          />
          <ColumnDirective
            field="category"
            headerText="Category"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            headerText="Actions"
            width="120"
            textAlign="Center"
            template={actionTemplate}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Toolbar, ExcelExport, Page]} />
      </GridComponent>

      {/* Pagination alignment left override */}
      <style>{`
        .e-pager.e-lib {
          justify-content: flex-start !important;
          padding-left: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default ManageRequest;

