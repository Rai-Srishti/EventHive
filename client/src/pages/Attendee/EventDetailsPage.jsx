// src/pages/Attendee/EventDetailsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import EventDetails from '../../components/EventDetails';
import events from '../../assets/sampledata/SampleEvents';

const EventDetailsPage = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  return (
    <div>
      {/* Banner */}
      <div
        style={{
          backgroundImage: `url(${event?.image || "/default-banner.jpg"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          position: 'relative',
          height: '400px',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Container>
            <p className="fw-bold display-1">Event Details</p>
            <p>
              <span style={{ color: '#fff' }} className="h5">Home</span>{' '}
              <span style={{ color: '#e91e63' }} className="h5">&gt;</span>{' '}
              <span style={{ color: '#e91e63' }} className="h5">Event Details</span>
            </p>
          </Container>
        </div>
      </div>

      {/* Event Content */}
      <Container className="my-5">
        {event ? (
          <EventDetails event={event} />
        ) : (
          <p className="text-danger">Event not found.</p>
        )}
      </Container>
    </div>
  );
};

export default EventDetailsPage;
