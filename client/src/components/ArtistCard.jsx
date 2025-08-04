import React from 'react';
import '../assets/css/ArtistCard.css';

const ArtistCard = ({ speaker }) => {
  return (
    <div className="speaker-card">
      <img
        src={speaker.photo} // should be a full URL
        alt={speaker.name}
        className="speaker-img fixed-artist-image"
      />
      <div className="speaker-info">
        <h5 className="speaker-name">{speaker.name}</h5>
        <p className="speaker-title">{speaker.genre}</p>
      </div>
    </div>
  );
};

export default ArtistCard;
