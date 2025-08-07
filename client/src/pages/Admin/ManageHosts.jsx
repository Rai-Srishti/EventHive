import React, { useState, useEffect } from "react";
import "../../assets/css/Admin/ManageRequest.css";
import { fetchAllHosts,blockHost,unblockHost } from "../../services/adminService";

const ManageHosts = () => {
  const [allHosts, setAllHosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const hostsPerPage = 10;

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await fetchAllHosts();
        console.log("Fetched hosts:", response);
        setAllHosts(response);
      } catch (error) {
        console.error("Failed to fetch hosts:", error);
      }
    };

    fetchHosts();
  }, []);

 const handleBlockToggle = async (hostId, isCurrentlyBlocked) => {
  try {
    const message = isCurrentlyBlocked
      ? await unblockHost(hostId)
      : await blockHost(hostId);

    alert(message); 
    
    const updatedHosts = await fetchAllHosts();
    setAllHosts(updatedHosts);
  } catch (error) {
    alert("Action failed. Please try again.");
  }
};

  const filteredHosts = allHosts.filter(
    (host) =>
      host.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * hostsPerPage;
  const currentHosts = filteredHosts.slice(startIndex, startIndex + hostsPerPage);

  useEffect(() => {
    if (page > 0 && startIndex >= filteredHosts.length) {
      setPage(0);
    }
  }, [searchTerm, filteredHosts.length, page, startIndex]);

  return (
    <div className="manage-request-container">
      <div className="manage-request-content">
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
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

        {/* Search Bar */}
        <div className="search-bar" style={{ marginBottom: "1rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              width: "50%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Table */}
        <table className="manage-request-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentHosts.length > 0 ? (
              currentHosts.map((host, index) => (
                <tr key={index}>
                  <td>{host.firstName}</td>
                  <td>{host.lastName}</td>
                  <td>{host.email}</td>
                  <td>{host.phoneNumber}</td>
                  <td>{host.city}</td>
                  <td>{host.state}</td>
                  <td>{host.country}</td>
                  <td>
                    <button
                      className={host.status == "BLOCKED" ? "button-approve" : "button-reject"}
                      onClick={() => handleBlockToggle(host.userId, host.status=="BLOCKED")}
                    >
                      {host.status=="BLOCKED" ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No hosts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
            className="pagination-btn"
          >
            Previous
          </button>
          <span>Page {page + 1}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={(page + 1) * hostsPerPage >= filteredHosts.length}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageHosts;



