// src/components/Header.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../assets/css/EventNavbar.css';
import logo from '../images/Logo.png';
import { BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../assets/css/Header.css';
import { useSelector } from 'react-redux';

const Header = () => {
  const favouriteCount = useSelector((state) => state.favourites.items.length);

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
            <Link to="/" className="nav-link">HOME</Link>
            <Nav.Link href="#about">ABOUT</Nav.Link>
            <Nav.Link href="#events">EVENTS</Nav.Link>
            <Nav.Link href="#speakers">SPEAKERS</Nav.Link>

            {/* Heart icon with Redux count */}
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

export default Header;
