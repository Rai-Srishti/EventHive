// src/components/BookingList.jsx
import React from 'react';
import BookingCard from './BookingCard';

const BookingList = ({ bookings, onCancel }) => {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p>No bookings available.</p>;
  }

  return (
    <div className="row">
      {bookings.map((booking) => (
        <BookingCard key={booking.ticketId} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
};

export default BookingList;
