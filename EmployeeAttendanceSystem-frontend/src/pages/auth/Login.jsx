// src/pages/auth/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../service/AuthService'; // AuthService ko import karein

export default function Login() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // Error message ke liye state

  const { username, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Purana error message clear karein

    try {
      // AuthService se login function call karein
      await AuthService.login(username, password);
      // Successful login par Home page par navigate karein
      navigate('/');
      window.location.reload(); // Navbar ko update karne ke liye reload karein (optional but helpful)
    } catch (error) {
      // Agar login fail hota hai
      console.error('Login failed:', error);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();

      setErrorMessage(resMessage); // Error message set karein
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Login</h2>

          <form onSubmit={(e) => handleLogin(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={'password'}
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            {/* Error message dikhayein agar hai toh */}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}