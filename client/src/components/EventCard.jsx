// src/components/EventCard.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../store/FavouriteSlice';
import '../assets/css/EventCard.css';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.items);
  const isFavourite = favourites.some((fav) => fav.eventId === event.eventId);

  const formattedDate = new Date(event.eventDate).toLocaleString();

  console.log("Image URL:", event.photo);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card h-100 shadow-sm position-relative">
        <img
          src={event.photo}
         

          className="card-img-top fixed-event-image"
          alt={event.eventName}
        />

        <button
          className="favourite-btn"
          onClick={() => dispatch(toggleFavourite(event))}
          aria-label="Add to favourites"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: isFavourite ? '#dc3545' : '#888',
            fontSize: '1.5rem',
          }}
        >
          {isFavourite ? <BsHeartFill /> : <BsHeart />}
        </button>

        <div className="card-body">
          <div className="text-muted small mb-2">
            <i className="bi bi-calendar-event me-2"></i>
            {formattedDate}
            <br />
            <i className="bi bi-geo-alt me-2"></i>
            {event.city}, {event.address}
          </div>
          <h5 className="card-title">{event.eventName}</h5>
          <p className="card-text">
            <strong>Artist:</strong> {event.artistName}<br />
            <strong>Hosted by:</strong> {event.hostName}
          </p>
          <button
            className="btn btn-danger book-btn"
            onClick={() => navigate(`/event-details/${event.eventId}`)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
