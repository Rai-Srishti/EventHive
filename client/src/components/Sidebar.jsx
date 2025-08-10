import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Logo from "../images/Logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Manage Requests", path: "/admin/requests" },
    { label: "Manage Hosts", path: "/admin/hosts" },
    { label: "Manage Attendee", path: "/admin/users" },
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
    boxShadow: "4px 0 12px rgba(0, 0, 0, 0.08)",
    overflowY: "auto",
  };

  const logoStyle = {
    width: "110px",
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={sidebarStyle}>
      {/* Logout Button on Top */}
      <div style={{ width: "100%", marginBottom: "20px" }}>
        <button
          onClick={handleLogout}
          style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          gap: "8px",
          padding: "10px 16px",
          width: "100%",
          border:"white" ,
          backgroundColor: "transparent",
          color: "#E2215F",
          borderRadius: "8px",
          fontSize: "18px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#E2215F";
        e.currentTarget.style.color = "#fff";
        }}
        onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "#E2215F";
        }}
        >
      <FaSignOutAlt />
      Logout
    </button>
      </div>

      {/* Logo */}
      <img src={Logo} alt="EventHive Logo" style={{ ...logoStyle, marginTop: "35px" }} />

      {/* Navigation */}
      <nav style={navStyle}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === "/admin"}
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
