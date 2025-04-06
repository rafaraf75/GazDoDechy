import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Layout from './components/Layout';

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
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Layout>
                <Dashboard setIsLoggedIn={setIsLoggedIn} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
