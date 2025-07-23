// src/components/EventCard.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../store/FavouriteSlice';
import '../assets/css/EventCard.css';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.items);
  const isFavourite = favourites.some((fav) => fav.id === event.id);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card h-100 shadow-sm position-relative">
        <img src={event.image} className="card-img-top" alt={event.title} />

        {/* Favourite button */}
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
          <span className="badge bg-danger mb-2">{event.seats} Seats</span>
          <div className="text-muted small mb-2">
            <i className="bi bi-calendar-event me-2"></i>{event.date}<br />
            <i className="bi bi-geo-alt me-2"></i>{event.location}
          </div>
          <h5 className="card-title">{event.title}</h5>
          <a href="#" className="text-danger fw-bold">Book Now</a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
