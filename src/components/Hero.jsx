import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../assets/css/Hero.css';
import heroImage from '../images/Hero4.png'; // Ensure the image path is correct

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center justify-content-center">
      <Container fluid>
        <Row className="align-items-center justify-content-center text-center text-lg-start">
          {/* ─────────────── Left content ─────────────── */}
          <Col lg={7} className="mb-5 mb-lg-0">
            {/* Catchy phrases row */}
            <ul className="hero-stats list-unstyled d-flex flex-wrap justify-content-center justify-content-lg-start mb-3">
              <li className="hero-tagline">✨ Unleash Creativity</li>
              <li className="hero-tagline">🎤 Share Ideas</li>
              <li className="hero-tagline">😂 Celebrate Laughter</li>
            </ul>

            {/* Headings */}
            <h1 className="hero-title">
              YOUR NEXT BIG<br />
              <span className="highlight">EXPERIENCE</span> STARTS HERE
            </h1>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
              <Button size="lg" className="hero-btn--primary">
                Join Now
              </Button>
              <Button size="lg" variant="outline-danger" className="hero-btn--outline">
                Discover More
              </Button>
            </div>
          </Col>

          {/* ─────────────── Right image ─────────────── */}
          <Col lg={5} className="text-center">
            <img
              src={heroImage}
              alt="Event Visual"
              className="img-fluid hero-image"
            />
          </Col>
        </Row>
      </Container>

      {/* Optional Vertical Caption */}
      <span className="vertical-caption d-none d-lg-block">
        A Celebration of Creativity
      </span>
    </section>
  );
};

export default Hero;
