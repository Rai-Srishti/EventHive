import React, { useEffect, useState } from 'react';
import BookingList from '../../components/BookingList';
import { getMyBookings } from '../../services/attendeeService'; 
function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error('Failed to load bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  
  const handleCancel = (cancelledTicketId) => {
    setBookings((prev) => prev.filter((b) => b.ticketId !== cancelledTicketId));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Bookings</h2>
      {loading ? (
        <p>Loading your bookings...</p>
      ) : (
        <BookingList bookings={bookings} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default MyBookings;
