import React, { useEffect, useState } from 'react';
import { getEventsByHostId } from '../../services/hostService';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyArtistsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const hostId = 1; // Replace with dynamic host ID

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEventsByHostId(hostId);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [hostId]);

  // Extract unique artists based on artist name
  const uniqueArtists = Array.from(
    new Map(events.map(event => [event.artistName, event])).values()
  );

  return (
    <div className="container-fluid p-0">
      <header className="text-white text-center py-4" style={{ backgroundColor: '#E2215F' }}>
        <p className="display-6">My Artists</p>
      </header>

      <div className="container py-4">
        {loading ? (
          <div className="text-center text-muted">Loading artists...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Artist Name</th>
                  <th>Event Name</th>
                  <th>City</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {uniqueArtists.length > 0 ? (
                  uniqueArtists.map((artistEvent, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{artistEvent.artistName}</td>
                      <td>{artistEvent.eventName}</td>
                      <td>{artistEvent.city}</td>
                      <td>{artistEvent.category}</td>
                      <td>{new Date(artistEvent.eventDate).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No artists found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArtistsPage;
