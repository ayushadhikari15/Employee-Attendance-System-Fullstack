// src/layout/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';

export default function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate('/login');
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Employee Management System
          </Link>

          <div className="d-flex">
            {currentUser ? (
              // === Agar User Logged In hai ===
              <>
                <span className="navbar-text me-3 text-white">
                  Welcome, {currentUser.username}
                </span>
                
                <Link className="btn btn-outline-light me-2" to="/adduser">
                  Add Employee
                </Link>

                <button className="btn btn-warning" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              // === Agar User Logged Out hai ===
              <>
                <Link className="btn btn-outline-light me-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-light" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}