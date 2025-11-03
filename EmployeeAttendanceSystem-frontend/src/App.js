// src/App.js

import './App.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';

// Naye imports
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './service/ProtectedRoute';
import AttendancePage from './pages/AttendancePage'; // <-- Naya page import karein

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* === Public Routes === */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          {/* === Protected Routes === */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/adduser"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/edituser/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/viewuser/:id"
            element={
              <ProtectedRoute>
                <ViewUser />
              </ProtectedRoute>
            }
          />
          
          {/* === NAYA ROUTE === */}
          <Route
            exact
            path="/attendance/:id"
            element={
              <ProtectedRoute>
                <AttendancePage />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="*" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;