import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import EventList from '../components/EventList';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import StatsCounter from '../components/StatsCounter';
import Artist from '../components/Artist';
import { getAllEvents as getAttendeeEvents } from '../services/attendeeService';
import { getAllPublicEvents } from '../services/publicService';

const Home = () => {
  const [searchCity, setSearchCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setSearchClicked(true);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');

      try {
        const data = token ? await getAttendeeEvents() : await getAllPublicEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error('Error loading events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const matchesCity = searchCity
        ? event.city.toLowerCase().includes(searchCity.toLowerCase())
        : true;

      const matchesDate = startDate
        ? new Date(event.eventDate) >= new Date(startDate)
        : true;

      return matchesCity && matchesDate;
    })
    .slice(0, 6);

  return (
    <>
      <Hero />

      <div className="container mt-4">
        <SearchBar
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          startDate={startDate}
          setStartDate={setStartDate}
          onSearch={handleSearch}
        />

        <div className="row mt-4">
          {loading ? (
            <div className="text-center text-muted">Loading events...</div>
          ) : error ? (
            <div className="text-center text-danger">{error}</div>
          ) : filteredEvents.length > 0 ? (
            <EventList events={filteredEvents} />
          ) : (
            searchClicked && (
              <div className="text-center text-muted">
                <h5>Oops, currently no shows available.</h5>
              </div>
            )
          )}
        </div>
      </div>

      <StatsCounter />
      <Artist />
      
    </>
  );
};

export default Home;
