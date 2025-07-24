import React, { useState } from 'react';
import EventBoxList from '../components/EventBoxList';
import events from '../assets/sampledata/SampleEvents';
import '../assets/css/EventPage.css';

const EventsPage = () => {
  const eventsPerPage = 9;
  const [page, setPage] = useState(0);

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
          <p>
            <span className="h5" style={{ color: '#ffffff' }}>Home</span>{' '}
            <span className="h5" style={{ color: '#e91e63' }}>&gt;</span>{' '}
            <span className="h5" style={{ color: '#e91e63' }}>Events</span>
          </p>
        </div>
      </div>

      {/* Upcoming Events Heading */}
      <div className="text-center my-5">
        <h1 style={{  fontWeight: 'bold' }} ><span style={{ color: '#e91e63', }}>Upcoming </span>Events</h1>
      </div>

      {/* Event Boxes */}
      <div className="container py-4">
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
      </div>
    </div>
  );
};

export default EventsPage;
