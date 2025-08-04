import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BsHeart } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import logo from '../../images/Logo.png';

const AttendeeNavbar = () => {
  const location = useLocation();
  const favouriteCount = useSelector((state) => state.favourites.items.length);

  const isActive = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  const handleLogout = () => {
    localStorage.clear(); // clears all items in localStorage
    // Optionally navigate to login or home (if using react-router v6)
    // navigate('/');
  };

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
            <Link to="/attendee" className={isActive('/attendee')}>HOME</Link>
            <Link to="/attendee/events" className={isActive('/attendee/events')}>EVENTS</Link>
            <Link to="/attendee/my-bookings" className={isActive('/attendee/my-bookings')}>MY BOOKINGS</Link>
            <Link to="/attendee/wallet" className={isActive('/attendee/wallet')}>WALLET</Link>
            <Link to="/attendee/about" className={isActive('/attendee/about')}>ABOUT</Link>
            <Link to="/attendee/artists" className={isActive('/attendee/artists')}>ARTISTS</Link>
            <Link to="/attendee/profile" className="nav-link"><FaUser /></Link>

            <Link to="/attendee/favourites" className="favourite-link position-relative">
              <BsHeart className="heart-icon" size={24} />
              {favouriteCount > 0 && (
                <span className="favourite-badge badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  {favouriteCount}
                </span>
              )}
            </Link>
          </Nav>

          <Nav className="me-2 align-items-center">
            <Link
              to="/"
              className="get-ticket-btn"
              style={{ textDecoration: 'none' }}
              onClick={handleLogout}
            >
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AttendeeNavbar;
