import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const layoutStyle = {
    display: "flex",
  };

  const contentStyle = {
    flex: 1,
    padding: "30px",
    backgroundColor: "white",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  return (
    <div style={layoutStyle}>
      <Sidebar />
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
