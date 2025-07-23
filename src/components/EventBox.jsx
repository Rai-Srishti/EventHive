import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavourite } from '../store/FavouriteSlice';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import '../assets/css/EventBox.css';

const EventBox = ({ event, isFavourite }) => {
  const dispatch = useDispatch();

  return (
    <div className="event-box d-flex flex-column flex-md-row align-items-stretch mb-5">
      {/* Image Section */}
      <div className="event-box-image">
        <img src={event.image} alt={event.title} />
      </div>

      {/* Content Section */}
      <div className="event-box-content position-relative py-5 px-4 px-md-5 w-100">
        {/* Favourite Button */}
        <button
          className={`favourite-btn ${isFavourite ? 'favourited' : ''}`}
          onClick={() => dispatch(toggleFavourite(event))}
          aria-label="Toggle favourite"
        >
          {isFavourite ? <BsHeartFill /> : <BsHeart />}
        </button>

        <div className="mb-3">
          <span className="badge bg-danger px-2 py-1 small-badge">{event.seats} Seats</span>
        </div>

        <div className="text-muted mb-3 fs-6">
          <div><i className="bi bi-calendar-event me-2"></i>{event.date}</div>
          <div><i className="bi bi-geo-alt me-2"></i>{event.location}</div>
        </div>

        <h4 className="fw-bold mb-3">{event.title}</h4>

        <button className="btn btn-danger book-btn">Book Now</button>
      </div>
    </div>
  );
};

export default EventBox;
