import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
  const [log, setLog] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const onLogin = () => {
    if (log.email.trim() === '') {
      toast.warn('Please enter email');
    } else if (log.password.trim() === '') {
      toast.warn('Please enter password');
    } else {
      toast.success('Login Successful!');
      navigate('/container/MenuBoard');
    }
  };

  return (
    <div>
      

      <div className="container my-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ fontSize: '2rem', color: '#343a40' }}>
            Login to Your Account
          </h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#dc3545', margin: '0.5rem auto 0' }} />
        </div>

        <form
          className="mx-auto p-4 border rounded shadow-sm w-100"
          style={{ maxWidth: '600px', backgroundColor: '#f8f9fa' }}
        >
          <div className="mb-3">
            <label className="form-label"><strong>Email</strong></label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={log.email}
              onChange={(e) => setLog({ ...log, email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={log.password}
              onChange={(e) => setLog({ ...log, password: e.target.value })}
            />
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={onLogin}
              style={{ fontWeight: 'bold' }}
            >
              Login
            </button>
          </div>

          <div className="text-center mt-3">
            <small>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#E2215F' }}>
                Register Here
              </Link>
            </small>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Login;