import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import events from '../../assets/sampledata/Events';

const EventsPage = () => {
  const eventsPerPage = 8; //numbe of events per page
  const [page, setPage] = useState(0); //to track the pabe number. starts with 0
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * eventsPerPage; //start index of a page. page = 0 => start index = 0, page = 1 => start index = 8...
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage); //events to show on current page. page = 0 => events from 0 to 7(both inclusive). page = 1 => events from 8 to 15

  useEffect(() => {
    if (page > 0 && startIndex >= filteredEvents.length) {
      setPage(0);
    }
  }, [searchTerm, filteredEvents.length, page, startIndex]);

  const handlePrevious = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if ((page + 1) * eventsPerPage < filteredEvents.length) setPage(prev => prev + 1);
  };

  return (
    <div className="container-fluid p-0">
      <header className="text-white text-center py-4" style={{ backgroundColor: '#E2215F' }}>
        <p className="display-6">My Events</p>
      </header>

      {/* Wrap main content in Bootstrap container for padding */}
      <div className="container py-3">
        <div className="py-4 rounded mt-5">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Search by event name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Date</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.length > 0 ? (
                currentEvents.map(event => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                    <td>{event.location}</td>
                    <td>{event.date}</td>
                    <td>{event.category}</td>
                    <td>{event.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-3">
          <button
            className="btn btn-outline-primary"
            onClick={handlePrevious}
            disabled={page === 0}
          >
            ← Previous
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={handleNext}
            disabled={(page + 1) * eventsPerPage >= filteredEvents.length}
          >
            Next →
          </button>
        </div>

        <p className="text-center mt-2">
          Page {page + 1} of {Math.max(1, Math.ceil(filteredEvents.length / eventsPerPage))
          }
        
        </p>
      </div>
    </div>
  );
};

export default EventsPage;


