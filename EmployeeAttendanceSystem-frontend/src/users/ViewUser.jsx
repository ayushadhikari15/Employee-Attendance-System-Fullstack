// src/users/ViewUser.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';

const API_URL = 'http://localhost:8080/api/users';

export default function ViewUser() {
  let navigate = useNavigate();
  
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
  });

  const [authHeader] = useState(AuthService.getAuthHeader());
  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

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
          
          <h2 className="text-center m-4">Employee Details</h2>

          <div className="card">
            <div className="card-header">
              Details of employee id : {user.id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name:</b> {user.name}
              </li>
              <li className="list-group-item">
                <b>Username:</b> {user.username}
              </li>
              <li className="list-group-item">
                <b>Email:</b> {user.email}
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary my-2" to={'/'}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}