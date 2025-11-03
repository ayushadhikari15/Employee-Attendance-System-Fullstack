// src/pages/auth/Register.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../service/AuthService'; 

export default function Register() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { name, username, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // AuthService se register function call karein
      const response = await AuthService.register(name, username, email, password);
      setSuccessMessage(response.data + ' Redirecting to login...'); // Success message
      
      // 2 second baad login page par bhej dein
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Registration failed:', error);
      
      // === YEH BLOCK UPDATE KIYA GAYA HAI ===
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data) || // Pehle check karein ki error.response hai
        error.message || // Agar network error hai, toh yeh message dikhayega
        error.toString();
      // === END UPDATE ===

      setErrorMessage(resMessage);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Register</h2>

          <form onSubmit={(e) => handleRegister(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Enter your name"
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
                placeholder="Enter your username"
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
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
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
                placeholder="Enter your password (min 6 chars)"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage} 
              </div>
            )}

            {/* Success message */}
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}