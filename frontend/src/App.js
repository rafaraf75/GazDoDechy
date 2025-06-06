import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';


import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import AdminPanel from './components/dashboard/AdminPanel';

import UserProfile from './components/user/UserProfile';
import EditProfile from './components/user/EditProfile';
import UserVehicles from './components/user/UserVehicles';
import UserAds from './components/user/UserAds';
import UserFollowing from './components/user/UserFollowing';
import UserEvents from './components/user/UserEvents';

import Market from './components/sections/market/Market';
import Tips from './components/yt/Tips';
import Events from './components/events/Events';
import Groups from './components/group/Groups';
import LiveHelp from './components/help/LiveHelp';
import MarketDetails from './components/sections/market/MarketDetails';
import MarketAdd from './components/sections/market/MarketAdd';
import MarketEdit from './components/sections/market/MarketEdit';
import PostEdit from './components/post/PostEdit';
import GroupDetails from './components/group/GroupDetails';
import MechanicRequestAdmin from './components/help/MechanicRequestAdmin';

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
    <SocketProvider>
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
        <Route path="/market/edit/:id" element={<MarketEdit />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/events" element={<Events />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/help" element={<LiveHelp />} />
        <Route path="/post/edit/:id" element={<PostEdit />} />
        <Route path="/groups/:slug" element={<GroupDetails />} />

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
        <Route
          path="/mechanic-requests-admin"
          element={
            isLoggedIn && localStorage.getItem('role') === 'admin' ? (
              <MechanicRequestAdmin />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
      </Routes>
    </Router>
    </SocketProvider>
  );
}

export default App;
