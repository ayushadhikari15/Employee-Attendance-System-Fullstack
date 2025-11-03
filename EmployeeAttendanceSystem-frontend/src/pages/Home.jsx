// src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AuthService from '../service/AuthService';

const API_URL = 'http://localhost:8080/api/users';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [authHeader] = useState(AuthService.getAuthHeader());

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get(API_URL, {
        headers: authHeader, 
      });
      setUsers(result.data);
    } catch (error) {
      console.error('Error loading users:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        AuthService.logout();
        window.location.replace('/login');
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader, 
      });
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                  
                  {/* === YAHAN CHANGE KIYA GAYA HAI === */}
                  <Link
                    className="btn btn-success mx-2"
                    to={`/attendance/${user.id}`}
                  >
                    Attendance
                  </Link>
                  {/* === END CHANGE === */}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}