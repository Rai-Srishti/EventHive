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
  fetchAllHosts,
  blockHost,
  unblockHost,
  validateHost,
} from "../../services/adminService";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";

const ManageHosts = () => {
  const [allHosts, setAllHosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let gridRef = null;

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await fetchAllHosts();
        setAllHosts(response);
      } catch (error) {
        console.error("Failed to fetch hosts:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch hosts.",
        });
      }
    };
    fetchHosts();
  }, []);

  const handleBlockToggle = async (hostId, isCurrentlyBlocked) => {
    try {
      const message = isCurrentlyBlocked
        ? await unblockHost(hostId)
        : await blockHost(hostId);

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
      });

      const updatedHosts = await fetchAllHosts();
      setAllHosts(updatedHosts);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Action failed. Please try again.",
      });
    }
  };

  const handleValidate = async (hostId) => {
    try {
      const message = await validateHost(hostId);
      Swal.fire({
        icon: "info",
        title: "Validation Result",
        text: message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Validation Failed",
        text: "Please try again later.",
      });
    }
  };

  // Toolbar for Excel Export
  const toolbarOptions = ["ExcelExport"];
  const toolbarClick = (args) => {
    if (gridRef && args.item.id.includes("excelexport")) {
      gridRef.excelExport();
    }
  };

  // Filter data based on search term
  const filteredHosts = allHosts.filter((host) =>
    Object.values(host).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ }}>
      <div style={{ textAlign: "center" }}>
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
          Manage Hosts
        </h1>
      </div>

      {/* Search bar */}
      <div style={{ marginBottom: "10px", textAlign: "right" }}>
        <input
          type="text"
          placeholder="Search hosts..."
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
        dataSource={filteredHosts}
        allowSorting={true}
        allowPaging={true}               // Pagination enabled here
        pageSettings={{ pageSize: 10 }}  // Optional: 10 rows per page
        toolbar={toolbarOptions}
        toolbarClick={toolbarClick}
        ref={(g) => (gridRef = g)}
        allowExcelExport={true}
        height={400}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="firstName"
            headerText="First Name"
            width="120"
            textAlign="Center"
            allowSorting={true}
          />
          <ColumnDirective
            field="lastName"
            headerText="Last Name"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="200"
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
            textAlign="Center"
            width="200"
            template={(props) => (
              <div>
                <button
                  style={{ marginRight: "8px" }}
                  onClick={() => handleValidate(props.userId)}
                  className="button-info"
                >
                  Validate
                </button>
                <button
                  onClick={() =>
                    handleBlockToggle(
                      props.userId,
                      props.status === "BLOCKED"
                    )
                  }
                  className={
                    props.status === "BLOCKED"
                      ? "button-approve"
                      : "button-reject"
                  }
                >
                  {props.status === "BLOCKED" ? "Unblock" : "Block"}
                </button>
              </div>
            )}
          />
        </ColumnsDirective>
        <Inject services={[Sort, Toolbar, ExcelExport, Page]} /> {/* Page injected */}
      </GridComponent>
    </div>
  );
};

export default ManageHosts;
