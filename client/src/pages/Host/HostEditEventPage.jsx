import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/css/TextInput.css";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { getAllArtists } from '../../services/artistService';
import { fetchEventById, updateEventByHost } from '../../services/hostService';

const HostEditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [artistList, setArtistList] = useState([]);
  const [showCustomArtist, setShowCustomArtist] = useState(false);

  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    address: '',
    artistName: ''
  });

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await fetchEventById(eventId);
        setFormData({
          eventName: data.eventName || '',
          description: data.description || '',
          address: data.address || '',
          artistName: data.artistName || ''
        });
      } catch (err) {
       // console.error('Error loading event:', err);
        Swal.fire('Error', 'Failed to load event data.', 'error');
      }
    };

    loadEvent();
  }, [eventId]);

  useEffect(() => {
    getAllArtists()
      .then(setArtistList)
      .catch(err => console.error("Error loading artists:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'artistName') {
      if (value === 'other') {
        setShowCustomArtist(true);
        setFormData(prev => ({ ...prev, artistName: '' }));
      } else {
        setShowCustomArtist(false);
        setFormData(prev => ({ ...prev, artistName: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCustomArtistChange = (e) => {
    setFormData(prev => ({ ...prev, artistName: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEventByHost(eventId, formData);

      await Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Event updated successfully.',
        confirmButtonColor: '#E2215F'
      });

      navigate("/host/my-events");
    } catch (error) {
      //console.error("Error updating event:", error);
      Swal.fire('Error', 'Event update failed.', 'error');
    }
  };

  return (
    <>
      <header className="text-white text-center py-4" style={{ backgroundColor: '#E2215F' }}>
        <p className='display-6'>Edit Event</p>
      </header>

      <div className="container py-4">
        <div className="p-4 rounded border shadow-sm">
          <form onSubmit={handleSubmit}>
            {["eventName", "description", "address"].map(field => (
              <div className="mb-3" key={field}>
                <label className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type="text"
                  name={field}
                  className="form-control text-input"
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Artist Name:</label>
              <select
                name="artistName"
                className="form-control text-input"
                onChange={handleChange}
                value={showCustomArtist ? "other" : formData.artistName}
              >
                <option value="">-- Select Artist --</option>
                {artistList.map((artist, idx) => (
                  <option key={idx} value={artist.artistName}>
                    {artist.artistName}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
            </div>

            {showCustomArtist && (
              <div className="mb-3">
                <label className="form-label">Enter Artist Name:</label>
                <input
                  type="text"
                  className="form-control text-input"
                  value={formData.artistName}
                  onChange={handleCustomArtistChange}
                />
              </div>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary rounded-pill">Update Event</button>
              <button
                type="button"
                className="btn btn-secondary rounded-pill"
                onClick={() => navigate("/host/my-events")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="bg-dark text-light text-center py-3 mt-4">
        © 2025 EventHive. All rights reserved.
      </footer>
    </>
  );
};

export default HostEditEventPage;
