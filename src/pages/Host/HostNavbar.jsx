// src/components/WhiteNavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import logo from '../../images/Logo.png';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const HostNavbar = () => {
  return (
    
      <Navbar expand="lg" className="event-navbar" variant="light">
      <Container fluid className="no-padding-container px-3">
        <Navbar.Brand as={Link} to="/" className="navbar-logo ms-2">
          <img
            src={logo}
            alt="EventLab"
            height="36"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="event-navbar-nav" />
        <Navbar.Collapse id="event-navbar-nav" className="justify-content-between">
          <Nav className="mx-auto align-items-center nav-main-list gap-3">
            <Link to="/host/dashboard" className="nav-link">ANALYTICS</Link>
            <Nav.Link href="/host/newevent">NEW EVENT</Nav.Link>
            <Nav.Link href="/host/myevents">MY EVENTS</Nav.Link>
            <Nav.Link href="/about">ABOUT</Nav.Link>
            <Nav.Link to="/contact" activeclassname="active">CONTACT</Nav.Link>
            <Nav.Link to="/profile" activeclassname="active"></Nav.Link>

            
          </Nav>

          <Nav className="me-2 align-items-center">
            <Button href="#get-ticket" className="get-ticket-btn">
              Get Ticket
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HostNavbar;
