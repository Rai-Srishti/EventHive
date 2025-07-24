import React from "react";

import speakers from "../assets/sampledata/speakerdata";
import SpeakerCard from "../components/SpeakerCard";
import "../assets/css/Speaker.css";

const SpeakersPage = () => {
  return (
    <>
      {/* Page Banner */}
      <div className="events-page">
        <div className="events-banner py-5">
          <div className="banner-content mx-5 px-4">
            <p className="fw-bold display-1">Speakers</p>
            <p>
              <span className="h5" style={{ color: "#ffffff" }}>Home</span>{" "}
              <span className="h5" style={{ color: "#e91e63" }}>&gt;</span>{" "}
              <span className="h5" style={{ color: "#e91e63" }}>Speakers</span>
            </p>
          </div>
        </div>
      </div>

      {/* Speakers Grid */}
      <div className="speakers-grid">
        {speakers.map((speaker, index) => (
          <SpeakerCard key={index} speaker={speaker} />
        ))}
      </div>

    </>
  );
};

export default SpeakersPage;
