// src/components/EventDetails.jsx
import React from 'react';
import { Row, Col, Button, Image, Card } from 'react-bootstrap';
import Footer from './Footer';

const EventDetails = ({ event }) => {
  if (!event) return null;

  return (
    <>
      <Card className="shadow-lg p-4">
        <Row className="align-items-center g-4">
          {/* Left: Image */}
          <Col md={5} className="text-center">
            <Image 
              src={event.image} 
              alt={event.title} 
              fluid 
              rounded 
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </Col>

          {/* Right: Event Details */}
          <Col md={7}>
            <h2 className="fw-bold mb-3">{event.title}</h2>

            <div className="text-muted mb-2">
              <i className="bi bi-calendar-event me-2"></i>
              {event.date}
            </div>

            <div className="text-muted mb-3">
              <i className="bi bi-geo-alt me-2"></i>
              {event.location}
            </div>

            <p>{event.description || 'No description available.'}</p>

            <div className="mt-4 d-flex justify-content-between align-items-center">
              <span className="badge bg-danger px-3 py-2">{event.seats} Seats</span>
              <Button variant="danger">Book Now</Button>
            </div>
          </Col>
        </Row>
      </Card>

     
    </>
  );
};

export default EventDetails;
