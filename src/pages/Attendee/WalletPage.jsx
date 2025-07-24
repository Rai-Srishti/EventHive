// WalletPage.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WalletPage = () => {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState('');

  const handleAddBalance = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      setBalance(balance + value);
      setAmount('');
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
        <div className="card shadow rounded" style={{ maxWidth: '700px', width: '100%'}}>
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
