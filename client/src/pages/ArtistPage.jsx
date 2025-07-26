import React from "react";
import { useLocation } from 'react-router-dom';
import speakers from "../assets/sampledata/speakerdata";
import ArtistCard from "../components/ArtistCard";
import "../assets/css/Artist.css";

const ArtistPage = () => {
  
  const location = useLocation();
  const pathname = location.pathname;
  const isPublic = !pathname.startsWith('/host') && !pathname.startsWith('/attendee');
  
  return (
    <>
      {/* Page Banner */}
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

      {/* Speakers Grid */}
      <div className="speakers-grid">
        {speakers.map((speaker, index) => (
          <ArtistCard key={index} speaker={speaker} />
        ))}
      </div>

    </>
  );
};

export default ArtistPage;
