import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PackageCard = ({ title, price, seats, features, highlight }) => {
  const [count, setCount] = useState(0);

  const bgClass = highlight ? 'border-warning' : 'border-primary';
  const textClass = highlight ? 'text-warning' : 'text-primary';

  return (
    <div className={`card h-100 shadow-sm ${bgClass}`}>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className={`card-title fw-bold ${textClass}`}>{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Rs. {price}</h6>
          <p className="card-text">Available Seats: {seats}</p>

          <ul className="list-group list-group-flush mb-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`list-group-item d-flex align-items-center ${feature.included ? 'text-success' : 'text-danger text-decoration-line-through'}`}
              >
                {feature.included ? <FaCheck className="text-success me-2" /> : <FaTimes className="text-danger me-2" />}&nbsp; {feature.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <button className="btn btn-danger" onClick={() => setCount(count > 0 ? count - 1 : 0)}>-</button>
          <span className="mx-3">Selected: {count}</span>
          <button className="btn btn-success" onClick={() => setCount(count + 1)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
