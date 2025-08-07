import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import EventDetails from '../../components/EventDetails';
import { getEventById } from '../../services/attendeeService';
import { getPublicEventById } from '../../services/publicService';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = token
          ? await getEventById(eventId)
          : await getPublicEventById(eventId);
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Could not load event details');
      }
    };

    if (eventId) {
      fetchEvent();
    } else {
      setError('Invalid event ID');
    }
  }, [eventId]);

  return (
    <div>
      {/* Banner */}
      <div
        style={{
          backgroundImage: `url(${event?.image || "/default-banner.jpg"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
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
              <span className="h5">Home</span>{' '}
              <span className="h5 text-danger">&gt;</span>{' '}
              <span className="h5 text-danger">Event Details</span>
            </p>
          </Container>
        </div>
      </div>

      {/* Event Content */}
      <Container className="my-5">
        {error && <p className="text-danger">{error}</p>}
        {!error && !event && <p className="text-muted">Loading event details...</p>}
        {event && <EventDetails event={event} />}
      </Container>
    </div>
  );
};

export default EventDetailsPage;
