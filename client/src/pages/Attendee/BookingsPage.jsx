import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PackageCard from '../../components/PackageCard';
import { getPhasesByEventId } from '../../services/bookingsService';

const BookingsPage = () => {
  const { eventId } = useParams();
  const [phases, setPhases] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const data = await getPhasesByEventId(eventId);
        setPhases(data);

        // Initialize counts
        const initialCounts = {};
        data.forEach((phase) => {
          initialCounts[phase.phaseId] = 0;
        });
        setCounts(initialCounts);
      } catch (err) {
        Swal.fire('Error', 'Failed to fetch ticket packages.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchPhases();
  }, [eventId]);

  const setCountFor = (phaseId, value) => {
    setCounts((prev) => ({ ...prev, [phaseId]: value }));
  };

  const totalSelected = Object.values(counts).reduce((a, b) => a + b, 0);

  const isDisabled = (phaseId) => {
    return totalSelected > 0 && counts[phaseId] === 0;
  };

  const handleBuy = async () => {
    const selected = Object.entries(counts).find(([_, count]) => count > 0);

    if (!selected) {
      Swal.fire('Warning', 'Please select at least one ticket.', 'warning');
      return;
    }

    const [phaseId, quantity] = selected;

    try {
      await purchaseTicket(phaseId, quantity);
      Swal.fire('Success', 'Ticket purchased successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Could not complete purchase.', 'error');
    }
  };

  if (loading) return <div className="text-center py-5">Loading packages...</div>;

  return (
    <div className="container-fluid p-0">
      <header className="text-white text-center py-4 mb-3" style={{ backgroundColor: '#E2215F' }}>
        <h2>Choose Your Package</h2>
        <p className="lead">Pick the plan that suits you best and enjoy the event!</p>
      </header>

      <main className="container mb-5">
        <div className="row g-3 justify-content-center">
          {phases.map((phase) => (
            <div key={phase.phaseId} className="col-md-6 col-lg-4 d-flex justify-content-center">
              <PackageCard
                title={phase.phaseName}
                price={phase.price}
                seats={phase.availableTickets}
                startTime={phase.startTime}
                endTime={phase.endTime}
                count={counts[phase.phaseId]}
                setCount={(val) => setCountFor(phase.phaseId, val)}
                disabled={isDisabled(phase.phaseId)}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-lg btn-primary" onClick={handleBuy}>Buy Now</button>
        </div>
      </main>
    </div>
  );
};

export default BookingsPage;
