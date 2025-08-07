import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';

const WalletPage = () => {
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    //Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    //Fetch wallet balance
    const fetchBalance = async () => {
      try {
        const res = await axiosInstance.get('/attendee/wallet');
        setBalance(res.data);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
        setBalance(0); // fallback
      }
    };

    fetchBalance();
  }, []);

  const handleAddBalance = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      alert('Enter a valid amount.');
      return;
    }

    try {
      const response = await axiosInstance.post('/payment/create-order', null, {
        params: {
          amount: value , 
          receiptId: `wallet_txn_${Date.now()}`
        }
      });

      const orderData = response.data;

      const options = {
        key: 'rzp_test_oXQBXTZLh27wth',
        amount: orderData.amount,
        currency: 'INR',
        name: 'EventHive Wallet',
        description: 'Add to wallet',
        order_id: orderData.id,

        handler: async function () {
          try {
            await axiosInstance.post('/payment/wallet/update-balance', null, {
              params: { amount: value }
            });

            alert('Payment successful and wallet updated!');
            setBalance((prev) => parseFloat(prev || 0) + value);
            setAmount('');
          } catch (err) {
            console.error(err);
            alert('Payment succeeded but wallet update failed.');
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

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('Something went wrong during payment.');
    }
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
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-success me-2" onClick={handleAddBalance}>Add</button>
              <button className="btn btn-secondary" onClick={() => setAmount('')}>Cancel</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletPage;
