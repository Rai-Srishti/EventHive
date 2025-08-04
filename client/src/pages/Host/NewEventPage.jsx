import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/css/TextInput.css";
import {jwtDecode} from "jwt-decode";
import { getAllArtists } from '../../services/artistService';
import { insertNewEvent } from '../../services/hostService'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const NewEventPage = () => {
  const [artistList, setArtistList] = useState([]);
  const [showCustomArtist, setShowCustomArtist] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    category: '',
    artistName: '',
    city: '',
    address: '',
    eventDate: '',
    phases: [
      { phaseName: 'GOLD', price: '', availableTickets: '', startTime: '', endTime: '' },
      { phaseName: 'SILVER', price: '', availableTickets: '', startTime: '', endTime: '' },
      { phaseName: 'PLATINUM', price: '', availableTickets: '', startTime: '', endTime: '' },
    ]
  });

  useEffect(() => {
    getAllArtists()
      .then(setArtistList)
      .catch(err => console.error("Error loading artists:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setPhoto(files[0]);
    } else if (name === 'artistName') {
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

  const handlePhaseChange = (index, field, value) => {
    const updatedPhases = [...formData.phases];
    updatedPhases[index][field] = value;
    setFormData(prev => ({ ...prev, phases: updatedPhases }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const eventPayload = {
      eventName: formData.eventName,
      description: formData.description,
      category: formData.category,
      artistName: formData.artistName,
      city: formData.city,
      address: formData.address,
      eventDate: formData.eventDate,
      phases: formData.phases
    };
  
    const payload = new FormData();
    payload.append("event", new Blob([JSON.stringify(eventPayload)], { type: "application/json" }));
  
    if (photo) {
      payload.append("photo", photo);
    } else {
      // Always send something, even if empty
      payload.append("photo", new Blob([], { type: "application/octet-stream" }));
    }
  
     const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    console.log("Decoded JWT:", decoded);
    const hostId = decoded.sub;
  
    try {
          const response = await insertNewEvent(payload, hostId);
          console.log("Event Created:", response.data);
         // alert("Event successfully submitted!");
         await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Event successfully submitted.',
          confirmButtonColor: '#3085d6',
        });
        navigate('/host/my-events');
        } catch (error) {
          console.error("Error submitting event:", error?.response || error);
         // alert("Event creation failed.");
         await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Event creation failed.',
          confirmButtonColor: '#d33',
        });
    
        }
  };
  

  return (
    <>
      <header className="text-white text-center py-4" style={{ backgroundColor: '#E2215F' }}>
        <p className='display-6'>New Event</p>
      </header>

      <div className="container py-4">
        <div className="p-4 rounded border shadow-sm">
          <form onSubmit={handleSubmit}>
            {["eventName", "description", "category", "city", "address"].map(field => (
              <div className="mb-3" key={field}>
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
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
              <label className="form-label">Event Date:</label>
              <input
                type="datetime-local"
                name="eventDate"
                className="form-control text-input"
                value={formData.eventDate}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Photo:</label>
              <input
                type="file"
                accept="image/*"
                name="photo"
                className="form-control"
                onChange={handleChange}
              />
            </div>

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

            <h5 className="mt-4">Phases</h5>
            {formData.phases.map((phase, index) => (
              <div key={index} className="border p-3 mb-3 rounded">
                <h6>{phase.phaseName} Phase</h6>
                <div className="row">
                  {["price", "availableTickets", "startTime", "endTime"].map(field => (
                    <div className="col-md-3" key={field}>
                      <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                      <input
                        type={field.includes("Time") ? "datetime-local" : "number"}
                        className="form-control"
                        value={phase[field]}
                        onChange={(e) => handlePhaseChange(index, field, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary rounded-pill">Raise Request</button>
              <button type="button" className="btn btn-secondary rounded-pill">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewEventPage;
