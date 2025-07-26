// src/components/WhiteNavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import logo from '../../images/Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const HostNavbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';
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
            <Link to="/host" className={isActive('/host')}>ANALYTICS</Link>
            <Link to="/host/new-event" className={isActive('/host/newevent')}>NEW EVENT</Link>
            <Link to="/host/my-events" className={isActive('/host/myevents')}>MY EVENTS</Link>
            <Link to="/host/artists" className={isActive('/host/artists')}>ARTISTS</Link>
            <Link to="/host/about" className={isActive('/host/about')}>ABOUT</Link>
            <Link to="/host/contact" activeclassname="active" className={isActive('/host/contact')}>CONTACT</Link>
            <Link to="/host/profile" activeclassname="active" className={isActive('/host/dashboard')}></Link>

            
          </Nav>

          <Nav className="me-2 align-items-center">
            <Link to="/" className="get-ticket-btn" style={{textDecoration:"none"}}>
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HostNavbar;
