// src/components/QRScanner.js
import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { validateTicket } from "../services/hostService";

const QRScanner = () => {
  const [ticketId, setTicketId] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleValidate = async (id) => {
    try {
      const data = await validateTicket(id);
      setStatus(data.status);
      setError(null);
    } catch (errMsg) {
      setStatus(null);
      setError(errMsg);
    }
  };

  const handleScan = (result) => {
    if (result && result[0]?.rawValue) {
      const scannedText = result[0].rawValue;
      const idMatch = scannedText.match(/TicketID:(\d+)/);
      if (!idMatch) {
        setError("Invalid QR Code format");
        return;
      }

      const extractedId = parseInt(idMatch[1], 10);
      setTicketId(extractedId);
      handleValidate(extractedId);
    }
  };

  const handleBack = () => {
    navigate("/Host/");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Scan Ticket QR</h2>
      <div style={{ width: "300px", margin: "auto" }}>
        <Scanner onScan={handleScan} onError={(err) => setError(err.message)} />
      </div>

      <div style={{ marginTop: "1rem" }}>
        {ticketId && <p>Scanned Ticket ID: {ticketId}</p>}
        {status && <p style={{ color: "green" }}>Ticket Status: {status}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {(status || error) && (
          <button
            onClick={handleBack}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go Back to Host Home
          </button>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
