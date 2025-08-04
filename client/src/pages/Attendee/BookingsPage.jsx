import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PackageCard from '../../components/PackageCard';
import { getPhasesByEventId, purchaseTicket } from '../../services/bookingsService';

const BookingsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [phases, setPhases] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const data = await getPhasesByEventId(eventId);
        setPhases(data);

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
    const selectedPhases = Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .map(([phaseId, count]) => {
        const phase = phases.find((p) => p.phaseId.toString() === phaseId);
        return {
          phaseId,
          count,
          name: phase.phaseName,
          price: phase.price,
          total: phase.price * count,
        };
      });

    if (selectedPhases.length === 0) {
      Swal.fire('Warning', 'Please select at least one ticket.', 'warning');
      return;
    }

    const totalAmount = selectedPhases.reduce((sum, p) => sum + p.total, 0);

    const htmlList = selectedPhases
      .map((p) => `<li>${p.name}: ${p.count} × ₹${p.price} = ₹${p.total}</li>`)
      .join('');

    const result = await Swal.fire({
      title: 'Confirm Your Purchase',
      html: `<ul style="text-align:left">${htmlList}</ul><strong>Total: ₹${totalAmount}</strong>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm Purchase',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
    });

    if (!result.isConfirmed) return;

    try {
      for (const phase of selectedPhases) {
        await purchaseTicket(phase.phaseId, phase.count);
      }

      Swal.fire('Success', 'Tickets purchased successfully!', 'success');
    } catch (err) {
      console.error(err);

      const errorMessage =
        err.response?.data?.message || err.response?.data || err.message;

      if (
        errorMessage.includes('Insufficient') ||
        errorMessage.includes('insufficient')
      ) {
        Swal.fire({
          title: 'Insufficient Balance',
          text: 'You don’t have enough balance to complete this purchase. Please add funds to your wallet.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Add Balance',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#3085d6',
        }).then((res) => {
          if (res.isConfirmed) {
            navigate('/attendee/wallet');
          }
        });
      } else if (errorMessage.includes('sold out') || errorMessage.includes('Sold')) {
        Swal.fire('Sold Out', 'The selected tickets are sold out!', 'warning');
      } else {
        Swal.fire('Error', errorMessage, 'error');
      }
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
          <button className="btn btn-lg btn-primary" onClick={handleBuy}>
            Buy Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookingsPage;
