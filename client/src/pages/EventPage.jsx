import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EventBoxList from '../components/EventBoxList';
import { getAllEvents as getAttendeeEvents } from '../services/attendeeService';
import { getAllPublicEvents } from '../services/publicService';
import '../assets/css/EventPage.css';

const EventsPage = () => {
  const eventsPerPage = 9;
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const pathname = location.pathname;
  const isPublic = !pathname.startsWith('/host') && !pathname.startsWith('/attendee');

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = token ? await getAttendeeEvents() : await getAllPublicEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const startIndex = page * eventsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + eventsPerPage);

  const handleNext = () => {
    if ((page + 1) * eventsPerPage < events.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="events-page">
      {/* Banner Section */}
      <div className="events-banner py-5">
        <div className="banner-content mx-5 px-4">
          <p className='display-1 fw-bold'>Events</p>
          {isPublic && (
            <p>
              <span className="h5" style={{ color: '#ffffff' }}>Home</span>{' '}
              <span className="h5" style={{ color: '#e91e63' }}>&gt;</span>{' '}
              <span className="h5" style={{ color: '#e91e63' }}>Events</span>
            </p>
          )}
        </div>
      </div>

      {/* Upcoming Events Heading */}
      <div className="text-center my-5">
        <h1 style={{ fontWeight: 'bold' }}>
          <span style={{ color: '#e91e63' }}>Upcoming </span>Events
        </h1>
      </div>

      {/* Event Boxes */}
      <div className="container py-4">
        {loading ? (
          <div className="text-center text-muted">Loading events...</div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : currentEvents.length > 0 ? (
          <>
            <EventBoxList events={currentEvents} />
            <div className="pagination-controls d-flex justify-content-center mt-4">
              <button
                onClick={handlePrevious}
                disabled={page === 0}
                className="btn btn-outline-dark me-2"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                disabled={(page + 1) * eventsPerPage >= events.length}
                className="btn btn-outline-dark"
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-muted">
            <h5>No events found.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
