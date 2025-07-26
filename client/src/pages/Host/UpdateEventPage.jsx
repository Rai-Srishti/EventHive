import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateEvent = () => {
  return (
    <div className="container-fluid p-0">
      

      {/* Header */}
      <header className="text-white text-center py-4" style={{ backgroundColor: '#E2215F' }}>
        <h2>Update Event</h2>
      </header>

      {/* Form */}
      <main className="container my-5">
        <div className="p-4 rounded shadow" style={{ border: '1px solid #ccc' }}>
          <form>
            <div className="mb-3">
              <label className="form-label">Event Name:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Description:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Category:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Artist Name:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Event:</label>
              <input type="date" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Location of Event:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-4">
              <label className="form-label">Photo:</label>
              <input type="file" className="form-control" />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Raise Request</button>
              <button type="button" className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        © 2025 EventHive. All rights reserved.
      </footer>
    </div>
  );
};

export default UpdateEvent;
