// src/service/AuthService.js

import axios from 'axios';

// Backend ka base URL
const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  // Login function
  login(username, password) {
    return axios
      .post(API_URL + 'login', {
        username,
        password,
      })
      .then((response) => {
        // Agar response mein token hai
        if (response.data.token) {
          // Token ko localStorage mein store karein
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  // Logout function
  logout() {
    // localStorage se user data hata dein
    localStorage.removeItem('user');
  }

  // Register function
  register(name, username, email, password) {
    return axios.post(API_URL + 'register', {
      name,
      username,
      email,
      password,
    });
  }

  // Current user ka data (token ke saath) localStorage se get karein
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Auth header (Token) get karne ke liye helper function
  // Isse hum protected API calls ke liye istemaal karenge
  getAuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      // Spring Boot backend 'Bearer ' prefix expect karta hai
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
}

// class ka ek instance export karein taaki hum ise pure project mein import kar sakein
export default new AuthService();