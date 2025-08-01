import React, { useState } from 'react';
import PackageCard from '../../components/PackageCard';
import samplePhases from '../../assets/sampledata/SamplePhases'; // adjust path based on your structure
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingsPage = () => {
  const [counts, setCounts] = useState(
    samplePhases.reduce((acc, phase) => {
      acc[phase.phaseId] = 0;
      return acc;
    }, {})
  );

  const totalSelected = Object.values(counts).reduce((a, b) => a + b, 0);

  const setCountFor = (phaseId, value) => {
    setCounts(prev => ({ ...prev, [phaseId]: value }));
  };

  const isDisabled = (phaseId) => {
    return totalSelected > 0 && counts[phaseId] === 0;
  };

  return (
    <div className="container-fluid p-0">
      <header className="text-white text-center py-4 mb-3" style={{ backgroundColor: '#E2215F' }}>
        <h2>Choose Your Package</h2>
        <p className="lead">Pick the plan that suits you best and enjoy the event!</p>
      </header>

      <main className="container mb-5">
        <div className="row g-3 justify-content-center">
          {samplePhases.map((phase) => (
            <div key={phase.phaseId} className="col-md-6 col-lg-4 d-flex justify-content-center">
              <PackageCard
                title={phase.title}
                price={phase.price}
                seats={phase.availableSeats}
                features={phase.features}
                highlight={phase.highlight}
                count={counts[phase.phaseId]}
                setCount={(val) => setCountFor(phase.phaseId, val)}
                disabled={isDisabled(phase.phaseId)}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-lg btn-primary">Buy Now</button>
        </div>
      </main>
    </div>
  );
};

export default BookingsPage;
