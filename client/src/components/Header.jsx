// src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsHeart } from 'react-icons/bs';

import '../assets/css/EventNavbar.css';
import '../assets/css/Header.css';
import logo from '../images/Logo.png';

const Header = () => {
  const location = useLocation();
  const favouriteCount = useSelector((state) => state.favourites.items.length);

  // Helper to check active path for styling
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
            <Link to="/" className={isActive('/')}>HOME</Link>
            <Link to="/about" className={isActive('/about')}>ABOUT</Link>
            <Link to="/events" className={isActive('/events')}>EVENTS</Link>
            <Link to="/artists" className={isActive('/artists')}>ARTISTS</Link>

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
  {location.pathname !== '/login' && location.pathname !== '/register' && (
    <Link to="/login" className="get-ticket-btn" style={{textDecoration: "none"}}>
      Login
    </Link>
  )}
</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
