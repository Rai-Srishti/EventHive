// src/components/SearchBar.jsx
import React from 'react';
import { BsCalendar } from 'react-icons/bs';
import '../assets/css/SearchBar.css';

const SearchBar = ({ searchCity, setSearchCity, startDate, setStartDate, onSearch }) => {
  return (
    <>
      <div className="search-bar-container p-4 rounded mt-5">
        <div className="row g-3 align-items-center">
          {/* City Input */}
          <div className="col-md-5">
            <div className="input-wrapper">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Event Location….."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
          </div>

          {/* Date Input */}
          <div className="col-md-5">
            <div className="input-wrapper position-relative">
              <input
                type="date"
                className="form-control custom-input pe-5"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <BsCalendar className="calendar-icon position-absolute top-50 end-0 translate-middle-y me-3" />
            </div>
          </div>

          {/* Search Button */}
          <div className="col-md-2 d-grid">
            <button className="btn btn-danger search-btn fw-bold" onClick={onSearch}>
              Search Now
            </button>
          </div>
        </div>
      </div>

      {/* Popular Events Heading */}
      <h4 className="popular-events-heading">Popular Events</h4>
    </>
  );
};

export default SearchBar;
