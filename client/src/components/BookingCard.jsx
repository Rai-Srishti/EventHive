// src/components/BookingCard.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../store/FavouriteSlice';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import Swal from 'sweetalert2';

import '../assets/css/EventCard.css';
import { cancelTicket } from './../services/attendeeService';

const BookingCard = ({ booking, onCancel }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.items);

  const {
    eventId,
    eventName,
    eventDate,
    photo,
    ticketId,
    phaseName,
    totalPrice,
    quantity,
    bookingDate,
    ticketStatus,
  } = booking;

  const isFavourite = favourites.some((fav) => fav.eventId === eventId);
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleString()
    : 'Date Unavailable';

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      try {
        const response = await cancelTicket(ticketId);

        await Swal.fire({
          title: 'Cancelled!',
          text: response.message || 'Your booking has been cancelled.',
          icon: 'success',
        });

        if (onCancel) onCancel(ticketId);
      } catch (error) {
        await Swal.fire({
          title: 'Error!',
          text: error.message || 'Failed to cancel the booking.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card h-100 shadow-sm position-relative">
        <img
          src={photo || 'https://via.placeholder.com/300x200'}
          alt={eventName}
          className="card-img-top fixed-event-image"
        />

        <button
          className="favourite-btn"
          onClick={() => dispatch(toggleFavourite({ eventId, eventName, photo }))}
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
            <i className="bi bi-ticket-perforated me-2"></i>
            {phaseName} – {quantity} ticket(s) – ₹{totalPrice}
            <br />
            <i className="bi bi-clock me-2"></i>
            Booked on: {new Date(bookingDate).toLocaleDateString()}
          </div>

          <h5 className="card-title">{eventName}</h5>

          {ticketStatus !== 'CANCELLED' ? (
            <button className="btn btn-outline-danger w-100" onClick={handleCancel}>
              Cancel Booking
            </button>
          ) : (
            <button className="btn btn-secondary w-100" disabled>
              Booking Cancelled
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
