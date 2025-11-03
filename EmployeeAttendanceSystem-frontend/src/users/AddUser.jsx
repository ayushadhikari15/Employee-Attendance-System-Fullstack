// src/users/AddUser.jsx

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';

const API_URL = 'http://localhost:8080/api/users';

export default function AddUser() {
  let navigate = useNavigate();

  // === YAHAN CHANGE KIYA GAYA HAI ===
  // Password ko state se hata diya
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
  });
  // === END CHANGE ===

  const [authHeader] = useState(AuthService.getAuthHeader());
  const [errorMessage, setErrorMessage] = useState('');

  // Password ko destructure se hata diya
  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // 'user' object mein ab sirf name, username, email hai
      await axios.post(API_URL, user, {
        headers: authHeader,
      });
      navigate('/');
    } catch (error) {
      console.error('Error submitting user:', error);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      setErrorMessage(resMessage);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New Employee</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Enter employee's name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Enter employee's username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={'email'}
                className="form-control"
                placeholder="Enter employee's e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            {/* === YAHAN CHANGE KIYA GAYA HAI === */}
            {/* Password field poori tarah se hata diya gaya hai */}
            {/* === END CHANGE === */}

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}