import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import ArtistCard from "../components/ArtistCard";
import "../assets/css/Artist.css";

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const pathname = location.pathname;
  const isPublic = !pathname.startsWith('/host') && !pathname.startsWith('/attendee');

  useEffect(() => {
    fetch("http://localhost:8080/artists")
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setArtists(data);
        setError(null);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to load artists");
      });
  }, []);

  return (
    <>
      <div className="events-page">
        <div className="events-banner py-5">
          <div className="banner-content mx-5 px-4">
            <p className="fw-bold display-1">Artists</p>
            {isPublic && (
              <p>
                <span className="h5" style={{ color: '#ffffff' }}>Home</span>{' '}
                <span className="h5" style={{ color: '#e91e63' }}>&gt;</span>{' '}
                <span className="h5" style={{ color: '#e91e63' }}>Artists</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="speakers-grid">
        {artists.map((artist, index) => (
          <ArtistCard key={index} speaker={artist} />
        ))}
      </div>
    </>
  );
};

export default ArtistPage;
