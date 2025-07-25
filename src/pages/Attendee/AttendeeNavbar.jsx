// src/components/WhiteNavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BsHeart } from 'react-icons/bs';
import logo from '../../images/Logo.png';
import { Link, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AttendeeNavbar = () => {
    const location = useLocation();
    const favouriteCount = useSelector((state) => state.favourites.items.length);
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
            <Link to="/attendee/home" className="nav-link">HOME</Link>
            <Nav.Link href="/attendee/events">EVENTS</Nav.Link>
            <Nav.Link href="/attendee/mybookings">MY BOOKINGS</Nav.Link>
            <Nav.Link href="/attendee/wallet">WALLET</Nav.Link>
            <Nav.Link href="/attendee/about">ABOUT</Nav.Link>
            <Nav.Link to="/contact" activeclassname="active">CONTACT</Nav.Link>
            <Nav.Link to="/contact" activeclassname="active"></Nav.Link>
            <Nav.Link to="/profile" activeclassname="active"></Nav.Link>
            <Link to="/favourites" className="favourite-link position-relative">
              <BsHeart className="heart-icon" size={24} />
              {favouriteCount > 0 && (
                <span className="favourite-badge badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                 {favouriteCount}
                </span>
              )}
           </Link>
            
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

export default AttendeeNavbar;
