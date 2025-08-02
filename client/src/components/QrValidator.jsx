import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const [ticketId, setTicketId] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateTicket = async (id) => {
    try {
      const response = await fetch("http://localhost:8080/host/validate-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          method: "QR_SCAN",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.status); // e.g., "VALIDATED"
        setError(null);
      } else {
        setStatus(null);
        setError(data.message || "Failed to validate ticket");
      }
    } catch (err) {
      setStatus(null);
      setError("Network error or invalid server response");
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
      validateTicket(extractedId);
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
