import React from 'react';
import '../assets/css/ArtistCard.css';

const SpeakerCard = ({ speaker }) => {
  return (
    <div className="speaker-card">
      <img
        src={speaker.image}
        alt={speaker.name}
        className="speaker-img"
      />
      <div className="speaker-info">
        <h5 className="speaker-name">{speaker.name}</h5>
        <p className="speaker-title">{speaker.title}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;
