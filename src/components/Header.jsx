import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../assets/css/EventNavbar.css';
import logo from '../images/Logo.png'; // Import the logo

const Header = () => {
  return (
    <Navbar expand="lg" className="event-navbar" variant="light">
      {/* Use fluid container for full width */}
      <Container fluid className="no-padding-container px-3">
        {/* Logo + Brand */}
        <Navbar.Brand href="/" className="navbar-logo ms-2">
          <img
            src={logo}
            alt="EventLab"
            height="36"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="event-navbar-nav" />
        <Navbar.Collapse id="event-navbar-nav" className="justify-content-between">
          {/* Centered Nav links */}
          <Nav className="mx-auto align-items-center nav-main-list">
            <Nav.Link href="#about">ABOUT</Nav.Link>
            <Nav.Link href="#events">EVENTS</Nav.Link>
            <Nav.Link href="#speakers">SPEKARS</Nav.Link>
            <Nav.Link href="#pages">PAGES</Nav.Link>
            <Nav.Link href="#blog">BLOG</Nav.Link>
            <Nav.Link href="#contact">CONTACT</Nav.Link>
          </Nav>

          {/* Button aligned right with margin */}
          <Nav className="me-2">
            <Button href="#get-ticket" className="get-ticket-btn">
              Get Ticket
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
