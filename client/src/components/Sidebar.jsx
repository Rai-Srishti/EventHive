import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../images/Logo.png"; // Update path if needed

const Sidebar = () => {
  const menuItems = [
    { label: "Manage Requests", path: "/admin/requests" },
    { label: "Manage Hosts", path: "/admin/hosts" },
    { label: "Manage Users", path: "/admin/users" },
    { label: "Manage Categories", path: "/admin/categories" },
    { label: "Manage Events", path: "/admin/events" },
  ];

  const sidebarStyle = {
    width: "260px",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    padding: "25px 18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "4px 0 12px rgba(0, 0, 0, 0.08)", // Subtle shadow added
  };

  const logoStyle = {
    width: "110px", // Smaller logo
    marginBottom: "35px",
  };

  const navStyle = {
    width: "100%",
  };

  const menuLinkStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    textDecoration: "none",
    color: "#333",
    marginBottom: "12px",
    transition: "all 0.3s ease",
    display: "block",
  };

  const activeLinkStyle = {
    backgroundColor: "#E2215F",
    color: "#ffffff",
    fontWeight: "bold",
  };

  const profileStyle = {
    ...menuLinkStyle,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div style={sidebarStyle}>
      <img src={Logo} alt="EventHive Logo" style={logoStyle} />

      <nav style={navStyle}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) =>
              isActive
                ? { ...menuLinkStyle, ...activeLinkStyle }
                : menuLinkStyle
            }
          >
            {item.label}
          </NavLink>
        ))}

        <NavLink
          to="/admin/profile"
          style={({ isActive }) =>
            isActive ? { ...profileStyle, ...activeLinkStyle } : profileStyle
          }
        >
          <FaUserCircle color="#E2215F" />
          Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

