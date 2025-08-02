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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const onRegister = () => {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      phone
    } = userdet;

    if (!first_name || !last_name || !email || !password || !confirm_password) {
      toast.warn('Please fill all required fields');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.warn('Invalid email format');
      return;
    }

    if (phone && !phoneRegex.test(phone)) {
      toast.warn('Invalid phone number');
      return;
    }

    if (password.length < 6) {
      toast.warn('Password must be at least 6 characters');
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
          {/* First Name */}
          <div className="mb-3">
            <label className="form-label"><strong>First Name</strong></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              value={userdet.first_name}
              onChange={(e) => setUserdet({ ...userdet, first_name: e.target.value })}
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label className="form-label"><strong>Last Name</strong></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              value={userdet.last_name}
              onChange={(e) => setUserdet({ ...userdet, last_name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label"><strong>Email</strong></label>
            <input
              type="email"
              className={`form-control ${userdet.email && !emailRegex.test(userdet.email) ? 'is-invalid' : ''}`}
              placeholder="Enter email"
              value={userdet.email}
              onChange={(e) => setUserdet({ ...userdet, email: e.target.value })}
            />
            {userdet.email && !emailRegex.test(userdet.email) && (
              <div className="invalid-feedback">Please enter a valid email.</div>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label"><strong>Phone Number</strong></label>
            <input
              type="tel"
              className={`form-control ${userdet.phone && !phoneRegex.test(userdet.phone) ? 'is-invalid' : ''}`}
              placeholder="Enter 10-digit phone number"
              value={userdet.phone}
              onChange={(e) => setUserdet({ ...userdet, phone: e.target.value })}
            />
            {userdet.phone && !phoneRegex.test(userdet.phone) && (
              <div className="invalid-feedback">Phone must be 10 digits.</div>
            )}
          </div>

          {/* City, State, Country in map */}
          {[
            { label: 'City', key: 'city', type: 'text' },
            { label: 'State', key: 'state', type: 'text' },
            { label: 'Country', key: 'country', type: 'text' }
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

          {/* Password */}
          <div className="mb-3">
            <label className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              className={`form-control ${userdet.password && userdet.password.length < 6 ? 'is-invalid' : ''}`}
              placeholder="Enter password"
              value={userdet.password}
              onChange={(e) => setUserdet({ ...userdet, password: e.target.value })}
            />
            {userdet.password && userdet.password.length < 6 && (
              <div className="invalid-feedback">Password must be at least 6 characters.</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label"><strong>Confirm Password</strong></label>
            <input
              type="password"
              className={`form-control ${userdet.confirm_password && userdet.password !== userdet.confirm_password ? 'is-invalid' : ''}`}
              placeholder="Re-enter password"
              value={userdet.confirm_password}
              onChange={(e) => setUserdet({ ...userdet, confirm_password: e.target.value })}
            />
            {userdet.confirm_password && userdet.password !== userdet.confirm_password && (
              <div className="invalid-feedback">Passwords do not match.</div>
            )}
          </div>

          {/* Role */}
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
