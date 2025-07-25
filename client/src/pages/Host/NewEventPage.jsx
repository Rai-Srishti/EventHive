// NewEventPage.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../assets/css/TextInput.css"

const NewEventPage = () => {
  return (
    <>
      <header className="text-white text-center py-4" style={{ backgroundColor: '#E2215F' }}>
        <p className='display-6'>New Event</p>
      </header>

      <div className="container py-4">
        <div className="p-4 rounded border shadow-sm">
          <form>
            <div className="mb-3">
              <label className="form-label">Event Name:</label>
              <input type="text" className="form-control text-input" />
            </div>

            <div className="mb-3">
              <label className="form-label">Event Description:</label>
              <input type="text" className="form-control text-input" />
            </div>

            <div className="mb-3">
              <label className="form-label">Event Category:</label>
              <input type="text" className="form-control text-input" />
            </div>

            <div className="mb-3">
              <label className="form-label">Artist Name:</label>
              <input type="text" className="form-control text-input" />
            </div>

            <div className="mb-4">
              <label className="form-label">City of Event:</label>
              <input type="text" className="form-control text-input" />
            </div>

            <div className="d-flex justify-content-between">
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
