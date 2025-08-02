import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
// Import the host service
import { getEventsByHostId } from '../../services/hostService';

const EventsPage = () => {
  const eventsPerPage = 8;
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]); //  Event data from API
  const [loading, setLoading] = useState(true); //Loading state
  const navigate = useNavigate();

  const hostId = 1; // Replace with dynamic host ID (e.g. from auth context or local storage)

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEventsByHostId(hostId);
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [hostId]);

  const handleEdit = (eventId) => {
    navigate(`/host/my-events/edit/${eventId}`);
  };

  const handleDelete = (eventId) => {
    navigate(`/host/my-events/delete/${eventId}`);
  };

  // Filter based on search
  const filteredEvents = events.filter(event =>
    event.eventName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = page * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

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

        {loading ? ( // Show loading message while fetching
          <div className="text-center text-muted">Loading events...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Sno</th>
                  <th>Event Name</th>
                  <th>Artist</th>
                  <th>Description</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.length > 0 ? (
                  currentEvents.map((event, index) => (
                    <tr key={index}>
                      <td>{page * eventsPerPage + index + 1}</td>
                      <td>{event.eventName}</td>
                      <td>{event.artistName}</td>
                      <td>{event.description}</td>
                      <td>{event.city}</td>
                      <td>{event.address}</td>
                      <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                      <td>{event.category}</td>
                      <td>{event.status}</td>
                      <td>
                        {event.lifecycleStatus === "UPCOMING" ? (
                          <div className="d-flex gap-2">
                            <button onClick={() => handleEdit(event.eventId)} className="btn btn-warning">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(event.eventId)} className="btn btn-danger">
                              Delete
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted">NO ACTIONS</span>
                        )}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No events found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

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
          Page {page + 1} of {Math.max(1, Math.ceil(filteredEvents.length / eventsPerPage))}
        </p>
      </div>
    </div>
  );
};

export default EventsPage;
