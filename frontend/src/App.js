import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';

// Nowe komponenty do sekcji użytkownika
import UserProfile from './components/user/UserProfile';
import EditProfile from './components/user/EditProfile';
import UserVehicles from './components/user/UserVehicles';
import UserAds from './components/user/UserAds';
import UserFollowing from './components/user/UserFollowing';
import UserEvents from './components/user/UserEvents';


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
        {/* Domyślna ścieżka – przekierowanie */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* Logowanie i rejestracja */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* Panel użytkownika – profil i podstrony */}
        <Route path="/user" element={<UserProfile />} />
        <Route path="/user/settings" element={<EditProfile />} />
        <Route path="/user/vehicles" element={<UserVehicles />} />
        <Route path="/user/ads" element={<UserAds />} />
        <Route path="/user/following" element={<UserFollowing />} />
        <Route path="/user/events" element={<UserEvents />} />

        {/* Panel główny (dashboard) */}
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

        {/* Panel administratora */}
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
