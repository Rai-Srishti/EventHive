import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const WalletPage = () => {
  const attendeeId = 14; // ✅ Hardcoded for now
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // ✅ Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // ✅ Fetch wallet balance from backend
    const fetchBalance = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/attendee/wallet/${attendeeId}`);
        console.log("Fetched balance from backend:", res.data); // ✅ Debug log
        setBalance(res.data);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        setBalance(0); // fallback
      }
    };

    fetchBalance();
  }, []);

  const handleAddBalance = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;

    try {
      const response = await axios.post('http://localhost:8080/payment/create-order', null, {
        params: {
          amount: value,
          receiptId: `wallet_txn_${Date.now()}`
        }
      });

      const orderData = response.data;

      const options = {
        key: 'rzp_test_oXQBXTZLh27wth',
        amount: orderData.amount,
        currency: 'INR',
        name: 'EventHive Wallet',
        description: 'Add Balance',
        order_id: orderData.id,

        handler: async function () {
          try {
            await axios.post(
              `http://localhost:8080/payment/wallet/update-balance/${attendeeId}`,
              null,
              {
                params: { amount: value }
              }
            );

            alert('Payment successful and wallet updated!');
            setBalance((prev) => parseFloat(prev) + value); // ✅ Ensure it's number
            setAmount('');
          } catch (err) {
            alert('Payment succeeded but wallet update failed.');
            console.error(err);
          }
        },

        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#E2215F'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Error creating order:', error);
      alert('Something went wrong while creating the payment order.');
    }
  };

  const handleCancel = () => {
    setAmount('');
  };

  return (
    <div className="container-fluid p-0">
      <header className="text-white text-center py-4" style={{ backgroundColor: '#E2215F' }}>
        <h2>Wallet</h2>
      </header>

      <main className="container py-4 d-flex justify-content-center">
        <div className="card shadow rounded" style={{ maxWidth: '700px', width: '100%' }}>
          <div className="card-body">
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label fw-semibold">Available Balance:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  value={balance !== null ? `Rs. ${balance}` : 'Loading...'}
                  disabled
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label fw-semibold">Add Balance:</label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-success me-2" onClick={handleAddBalance}>Add</button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletPage;
