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

import {
  fetchAllAttendees,
  blockAttendee,
  unblockAttendee,
  validateAttendee,
} from "../../services/adminService";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let gridRef = null;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const attendees = await fetchAllAttendees();
      setUsers(attendees);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch attendees.", "error");
    }
  };

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      const message = isBlocked
        ? await unblockAttendee(userId)
        : await blockAttendee(userId);

      await Swal.fire("Success", message, "success");
      loadUsers();
    } catch (err) {
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  const handleValidate = async (userId) => {
    try {
      const message = await validateAttendee(userId);
      Swal.fire("Validation Result", message, "info");
    } catch (err) {
      Swal.fire("Error", "Validation failed. Try again later.", "error");
    }
  };

  // Toolbar options for Excel export
  const toolbarOptions = ["ExcelExport"];

  const toolbarClick = (args) => {
    if (gridRef && args.item.id.includes("excelexport")) {
      gridRef.excelExport();
    }
  };

  // Filter users by search term 
  const filteredUsers = users.filter((user) =>
    (
      `${user.firstName} ${user.lastName} ${user.email} ${user.phoneNumber} ${user.city} ${user.state} ${user.country}`
    )
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Action buttons template for grid
  const actionTemplate = (props) => (
    <div>
      <button
        style={{ marginRight: "8px" }}
        className="button-info"
        onClick={() => handleValidate(props.userId)}
      >
        Validate
      </button>
      <button
        className={props.status === "BLOCKED" ? "button-approve" : "button-reject"}
        onClick={() => handleBlockToggle(props.userId, props.status === "BLOCKED")}
      >
        {props.status === "BLOCKED" ? "Unblock" : "Block"}
      </button>
    </div>
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
          Manage Users
        </h1>
      </div>

      {/* Search input */}
      <div style={{ marginBottom: "10px", textAlign: "right" }}>
        <input
          type="text"
          placeholder="Search users..."
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
        dataSource={filteredUsers}
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
            field="userId"
            headerText="ID"
            width="90"
            textAlign="Center"
          />
          <ColumnDirective
            field="firstName"
            headerText="Name"
            width="160"
            textAlign="Center"
            template={(props) => `${props.firstName} ${props.lastName}`}
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="180"
            textAlign="Center"
          />
          <ColumnDirective
            field="phoneNumber"
            headerText="Phone"
            width="130"
            textAlign="Center"
          />
          <ColumnDirective
            field="city"
            headerText="City"
            width="100"
            textAlign="Center"
          />
          <ColumnDirective
            field="state"
            headerText="State"
            width="100"
            textAlign="Center"
          />
          <ColumnDirective
            field="country"
            headerText="Country"
            width="100"
            textAlign="Center"
          />
          <ColumnDirective
            headerText="Actions"
            width="200"
            textAlign="Center"
            template={actionTemplate}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Toolbar, ExcelExport, Page]} />
      </GridComponent>

      {/* Pagination left align override */}
      <style>{`
        .e-pager.e-lib {
          justify-content: flex-start !important;
          padding-left: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default ManageUsers;
