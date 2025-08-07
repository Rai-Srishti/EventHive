import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '	#fff7fa' }}>
      <div className="text-center">
        <h1 className="display-1 text-danger">404</h1>
        <p className="lead">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary mt-3">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
