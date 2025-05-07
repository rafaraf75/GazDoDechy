import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import UserPanel from './components/UserPanel';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserPanel />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isLoggedIn && localStorage.getItem('role') === 'admin' ? (
              <AdminPanel />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
