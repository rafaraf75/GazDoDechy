import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';

// Nowe komponenty do sekcji użytkownika
import UserProfile from './components/user/UserProfile';
import EditProfile from './components/user/EditProfile';
import UserVehicles from './components/user/UserVehicles';
import UserAds from './components/user/UserAds';
import UserFollowing from './components/user/UserFollowing';
import UserEvents from './components/user/UserEvents';

import Market from './components/sections/market/Market';
import Tips from './components/sections/Tips';
import Events from './components/sections/Events';
import Groups from './components/sections/Groups';
import LiveHelp from './components/sections/LiveHelp';
import MarketDetails from './components/sections/market/MarketDetails';
import MarketAdd from './components/sections/market/MarketAdd';

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

        <Route path="/market" element={<Market />} />
        <Route path="/market/add" element={<MarketAdd />} />
        <Route path="/market/:id" element={<MarketDetails />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/events" element={<Events />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/help" element={<LiveHelp />} />

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
