import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const WalletPage = () => {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleAddBalance = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;

    try {
      // 1. Create Razorpay order from backend
      const response = await axios.post('http://localhost:8080/payment/create-order', null, {
        params: {
          amount: value,
          receiptId: `wallet_txn_${Date.now()}`
        }
      });

      const orderData = response.data; // Backend returns order as JSON string

      // 2. Configure Razorpay options
      const options = {
        key: 'rzp_test_oXQBXTZLh27wth',
        amount: orderData.amount,
        currency: 'INR',
        name: 'EventHive Wallet',
        description: 'Add Balance',
        order_id: orderData.id,
        handler: function (response) {
          alert('Payment successful!');
          setBalance((prev) => prev + value);
          setAmount('');
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
                <input type="text" className="form-control" value={`Rs. ${balance}`} disabled />
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
