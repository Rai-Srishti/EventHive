import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../services/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';

const AttendeeProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/attendee/details');
        const data = res.data;

        setProfileData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          city: data.city || '',
          state: data.state || '',
          country: data.country || '',
        });
      } catch (error) {
        console.error('Error fetching attendee details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not load profile details.',
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (data) => {
    const trimmedData = {};
    Object.entries(data).forEach(([key, value]) => {
      trimmedData[key] = value.trim();
    });

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedData.email)) {
      return { valid: false, message: 'Please enter a valid email address.' };
    }

    // Phone number: must be 10 digits (customize as per your country)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(trimmedData.phoneNumber)) {
      return { valid: false, message: 'Phone number must be 10 digits.' };
    }

    return { valid: true, trimmedData };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { valid, trimmedData, message } = validate(profileData);

    if (!valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: message,
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: 'Update Profile?',
      text: 'Are you sure you want to update your profile?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await axiosInstance.put('/attendee/update-profile', trimmedData);

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully.',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      console.error('Error updating profile:', error);

      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error?.response?.data?.message || 'Something went wrong!',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div>
      <header className="text-white text-center py-4" style={{ backgroundColor: '#E2215F' }}>
        <p className="display-6">Attendee Profile</p>
      </header>

      <div className="container py-4">
        <div className="p-4 rounded border shadow-sm">
          <form onSubmit={handleSubmit}>
            {["firstName", "lastName", "email", "phoneNumber", "city", "state", "country"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  className="form-control"
                  value={profileData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary rounded-pill">Update Profile</button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendeeProfile;
