// src/service/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from './AuthService';

const ProtectedRoute = ({ children }) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    // Agar user authenticated nahi hai, toh login page par bhej do
    return <Navigate to="/login" />;
  }

  // Agar user authenticated hai, toh requested component (children) ko render karo
  return children;
};

export default ProtectedRoute;