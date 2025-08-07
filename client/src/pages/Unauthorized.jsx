import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Unauthorized = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '	#fff7fa' }}>
      <div className="text-center">
        <h1 className="display-1 text-danger">Unauthorized</h1>
        <p className="lead">Oops! You aren't authorized to visit this page.</p>
        
      </div>
    </div>
  );
};

export default Unauthorized;
