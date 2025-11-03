// src/users/EditUser.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthService from '../service/AuthService';

const API_URL = 'http://localhost:8080/api/users';

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
  });

  const [authHeader] = useState(AuthService.getAuthHeader());
  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, user, {
        headers: authHeader,
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`${API_URL}/${id}`, {
        headers: authHeader,
      });
      setUser(result.data);
    } catch (error) {
      console.error('Error loading user:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        AuthService.logout();
        navigate('/login');
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          
          <h2 className="text-center m-4">Edit Employee</h2>

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