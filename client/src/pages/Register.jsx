import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function Register() {
  const [userdet, setUserdet] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    role: 'Admin'
  });

  const navigate = useNavigate();

  const onRegister = () => {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password
    } = userdet;

    if (!first_name || !last_name || !email || !password || !confirm_password) {
      toast.warn('Please fill all required fields');
      return;
    }

    if (password !== confirm_password) {
      toast.warn('Passwords do not match');
      return;
    }

    toast.success('Registered successfully!');
    navigate('/login');
  };

  return (
    <div>
      <div className="container my-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ fontSize: '2rem', color: '#343a40' }}>
            Create Your Account
          </h2>
          <div
            style={{
              width: '80px',
              height: '4px',
              backgroundColor: '#dc3545',
              margin: '0.5rem auto 0'
            }}
          />
        </div>

        <form
          className="mx-auto p-4 border rounded shadow-sm w-100"
          style={{ maxWidth: '600px', backgroundColor: '#f8f9fa' }}
        >
          {[
            { label: 'First Name', key: 'first_name', type: 'text' },
            { label: 'Last Name', key: 'last_name', type: 'text' },
            { label: 'Email', key: 'email', type: 'email' },
            { label: 'Phone Number', key: 'phone', type: 'tel' },
            { label: 'City', key: 'city', type: 'text' },
            { label: 'State', key: 'state', type: 'text' },
            { label: 'Country', key: 'country', type: 'text' },
            { label: 'Password', key: 'password', type: 'password' },
            { label: 'Confirm Password', key: 'confirm_password', type: 'password' }
          ].map(({ label, key, type }) => (
            <div className="mb-3" key={key}>
              <label className="form-label"><strong>{label}</strong></label>
              <input
                type={type}
                className="form-control"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={userdet[key]}
                onChange={(e) => setUserdet({ ...userdet, [key]: e.target.value })}
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label"><strong>Role</strong></label>
            <select
              className="form-select"
              value={userdet.role}
              onChange={(e) => setUserdet({ ...userdet, role: e.target.value })}
            >
              <option value="Admin">Host</option>
              <option value="Attendee">Attendee</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-danger w-100 fw-bold"
            onClick={onRegister}
          >
            Sign Up
          </button>

          <div className="text-center mt-3">
            <small>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#E2215F' }}>
                Login Here
              </Link>
            </small>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Register;