import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavourite } from '../store/FavouriteSlice';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import '../assets/css/EventBox.css';

const EventBox = ({ event, isFavourite }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="event-box d-flex flex-column flex-md-row align-items-stretch mb-5">
      {/* Image Section */}
      <div className="event-box-image">
        <img src={event.photo} alt={event.eventName} />
      </div>

      {/* Content Section */}
      <div className="event-box-content position-relative py-5 px-4 px-md-5 w-100">
        <button
          className={`favourite-btn ${isFavourite ? 'favourited' : ''}`}
          onClick={() => dispatch(toggleFavourite(event))}
          aria-label="Toggle favourite"
        >
          {isFavourite ? <BsHeartFill /> : <BsHeart />}
        </button>

        <div className="row">
          {/* Left column: Event name, time, location */}
          <div className="col-md-6 mb-3">
            <h4 className="fw-bold mb-2">{event.eventName}</h4>

            <div className="text-muted mb-2 fs-6">
              <div>
                <i className="bi bi-calendar-event me-2"></i>
                {new Date(event.eventDate).toLocaleString()}
              </div>
              <div>
                <i className="bi bi-geo-alt me-2"></i>
                {event.address || event.city}
              </div>
            </div>

            <button
              className="btn btn-danger book-btn mt-2"
              onClick={() => navigate(`/event-details/${event.eventId}`)}
            >
              View Details
            </button>
          </div>

          {/* Right column: Additional info from DTO */}
          <div className="col-md-6 text-muted fs-6">
            <div>
              <strong>Category:</strong> {event.category || 'N/A'}
            </div>
            <div>
              <strong>Artist:</strong> {event.artistName || 'N/A'}
            </div>
            <div>
              <strong>Host:</strong> {event.hostName || 'N/A'}
            </div>
            {event.description && (
              <div className="mt-2">
                <strong>Description:</strong>{' '}
                {event.description.length > 80
                  ? `${event.description.slice(0, 77)}...`
                  : event.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBox;
