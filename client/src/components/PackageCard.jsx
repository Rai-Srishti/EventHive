import React from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import moment from 'moment';

const PackageCard = ({ title, price, seats, startTime, endTime, count, setCount, disabled }) => {
  return (
    <div className="card h-100 shadow-sm border-primary">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title fw-bold text-primary">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Rs. {price}</h6>
          <p className="card-text">Available Seats: {seats}</p>

          <div className="mb-2 text-muted">
            <FaCalendarAlt className="me-2" />
            Start: {moment(startTime).format('LLL')}
          </div>

          <div className="text-muted">
            <FaClock className="me-2" />
            End: {moment(endTime).format('LLL')}
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-4">
          <button className="btn btn-danger" onClick={() => setCount(Math.max(0, count - 1))} disabled={disabled || count === 0}>-</button>
          <span className="mx-3">Selected: {count}</span>
          <button className="btn btn-success" onClick={() => setCount(count + 1)} disabled={disabled}>+</button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
