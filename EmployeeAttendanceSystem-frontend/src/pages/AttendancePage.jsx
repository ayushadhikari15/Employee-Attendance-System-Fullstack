// src/pages/AttendancePage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AttendanceService from '../service/AttendanceService';
import AuthService from '../service/AuthService';
import axios from 'axios';

export default function AttendancePage() {
  const { id } = useParams(); // Employee ID from URL
  const [employee, setEmployee] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to load attendance history
  const loadAttendanceHistory = async () => {
    try {
      const response = await AttendanceService.getAttendanceForEmployee(id);
      setAttendanceHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch attendance history', error);
      setErrorMessage('Failed to load attendance history.');
    }
  };

  // Function to load employee details (name, etc.)
  const loadEmployeeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${id}`, {
        headers: AuthService.getAuthHeader(),
      });
      setEmployee(response.data);
    } catch (error) {
      console.error('Failed to fetch employee details', error);
      setErrorMessage('Failed to load employee details.');
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadEmployeeDetails();
    loadAttendanceHistory();
  }, [id]);

  // Function to handle marking attendance
  const handleMarkAttendance = async (status) => {
    setMessage('');
    setErrorMessage('');
    try {
      const response = await AttendanceService.markAttendance(id, status);
      setMessage(response.data); // "Attendance marked/updated successfully"
      // Refresh history
      loadAttendanceHistory();
    } catch (error) {
      console.error('Failed to mark attendance', error);
      const resMessage =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      setErrorMessage(resMessage);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 shadow">
          
          <h2 className="text-center m-3">
            Manage Attendance for {employee ? employee.name : 'Employee'}
          </h2>

          <div className="card p-3 mb-4">
            <h4 className="text-center">Mark Today's Attendance</h4>
            <p className="text-center text-muted">Today is: {new Date().toLocaleDateString()}</p>
            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button 
                className="btn btn-primary btn-lg mx-2" 
                onClick={() => handleMarkAttendance('PRESENT')}
              >
                Mark as Present
              </button>
              <button 
                className="btn btn-warning btn-lg mx-2" 
                onClick={() => handleMarkAttendance('ABSENT')}
              >
                Mark as Absent
              </button>
            </div>
          </div>

          <hr />

          <h3 className="text-center m-3">Attendance History</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.length > 0 ? (
                attendanceHistory.map((record) => (
                  <tr key={record.id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>
                      {record.status === 'PRESENT' ? (
                        <span className="badge bg-success">PRESENT</span>
                      ) : (
                        <span className="badge bg-danger">ABSENT</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">No attendance history found.</td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className="text-center mt-4">
            <Link className="btn btn-outline-secondary" to="/">
              Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}