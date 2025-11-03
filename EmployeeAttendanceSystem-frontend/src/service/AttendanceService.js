// src/service/AttendanceService.js

import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8080/api/attendance/';

class AttendanceService {
  
  // Nayi attendance mark karne ke liye
  markAttendance(employeeId, status) {
    return axios.post(
      API_URL + 'mark',
      {
        employeeId,
        status,
      },
      { headers: AuthService.getAuthHeader() } // Token zaroori hai
    );
  }

  // Ek employee ki saari attendance history get karne ke liye
  getAttendanceForEmployee(employeeId) {
    return axios.get(API_URL + 'employee/' + employeeId, {
      headers: AuthService.getAuthHeader(), // Token zaroori hai
    });
  }
}

export default new AttendanceService();