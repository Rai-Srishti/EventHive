import React from 'react';
import { Row, Col, Button, Image, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EventDetails = ({ event }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    const isLoggedIn = !!localStorage.getItem('token'); 

    if (isLoggedIn) {
      navigate(`/attendee/booking/${event.eventId}`);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please login first!',
        text: 'You need to be logged in to book an event.',
        confirmButtonColor: '#d33',
      });
    }
  };

  if (!event) return null;

  return (
    <Card className="shadow-lg p-4">
      <Row className="align-items-center g-4">
        <Col md={5} className="text-center">
          <Image
            src={event.photo}
            alt={event.eventName}
            fluid
            rounded
            style={{ maxHeight: '300px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-event.jpg'; // fallback image
            }}
          />
        </Col>

        <Col md={7}>
          <h2 className="fw-bold mb-3">{event.eventName}</h2>

          <div className="text-muted mb-2">
            <i className="bi bi-calendar-event me-2"></i>
            {new Date(event.eventDate).toLocaleDateString()}
          </div>

          <div className="text-muted mb-2">
            <i className="bi bi-person-music me-2"></i>
            Artist: {event.artistName || 'N/A'}
          </div>

          <div className="text-muted mb-2">
            <i className="bi bi-person-circle me-2"></i>
            Hosted by: {event.hostName || 'N/A'}
          </div>

          <div className="text-muted mb-3">
            <i className="bi bi-geo-alt me-2"></i>
            {event.city}, {event.address}
          </div>

          <p className="mt-3">{event.description || 'No description available.'}</p>

          <div className="mt-4 d-flex justify-content-end">
            <Button variant="danger" onClick={handleBooking}>
              Book Now
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default EventDetails;
