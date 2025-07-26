// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import '../assets/css/Footer.css';
import logo from '../images/Logo.png'; // ✅ Import logo

const Footer = () => {
  return (
    <footer className="footer text-white pt-5 pb-3">
      <Container>
        <Row className="mb-5">
          {/* Quick Links */}
          <Col md={4}>
            <h5 className="footer-title">Quick Link</h5>
            <ul className="footer-links">
              <li>About Us</li>
              <li>Events</li>
              <li>Schedule</li>
              <li>Our Support</li>
              <li>Artists</li>
              <li>Sponsor</li>
              <li>Blog</li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4} className="text-center text-md-center mt-4 mt-md-0">
            <h5 className="footer-title">Contact</h5>
            <ul className="footer-contact">
              <li><FaPhoneAlt className="me-2" /> +1763-227-5032</li>
              <li><FaPhoneAlt className="me-2" /> +1763-227-5032</li>
              <li><FaEnvelope className="me-2" /> info@example.com</li>
              <li><FaEnvelope className="me-2" /> support@example.com</li>
              <li><FaMapMarkerAlt className="me-2" /> 2752 Willison Street Eagan, United States</li>
            </ul>
          </Col>

          {/* Branding + Social */}
          <Col md={4} className="mt-4 mt-md-0 d-flex flex-column align-items-md-end align-items-center justify-content-between">
            <div className="footer-logo mb-3">
              <img src={logo} alt="EventHive" height="40" />
            </div>
            <div className="footer-social d-flex justify-content-end gap-3">
              <FaFacebookF className="social-icon" />
              <FaInstagram className="social-icon" />
              <FaLinkedinIn className="social-icon" />
              <FaTwitter className="social-icon" />
              <FaWhatsapp className="social-icon" />
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row>
          <Col className="text-center">
            <p className="mb-0 copyright">
              Copyright 2025 EventHive
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
