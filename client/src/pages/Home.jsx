// src/pages/Home.jsx
import React, { useState } from 'react';
import Hero from '../components/Hero';
import EventList from '../components/EventList';
import sampleEvents from '../assets/sampledata/SampleEvents';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import StatsCounter from '../components/StatsCounter';
import Artist from '../components/Artist';

const Home = () => {
  const [searchCity, setSearchCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearch = () => {
    setSearchClicked(true);
  };

  const filteredEvents = sampleEvents
    .filter((event) => {
      const matchesCity = searchCity
        ? event.location.toLowerCase().includes(searchCity.toLowerCase())
        : true;

      const matchesDate = startDate
        ? new Date(event.date) >= new Date(startDate)
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
          {filteredEvents.length > 0 ? (
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
      <StatsCounter/>
      <Artist/>
      
    </>
  );
};

export default Home;
