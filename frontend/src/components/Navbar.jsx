import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role'); // Dodane

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role'); // Dodane
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800">
        <Link to="/dashboard">GazDoDechy</Link>
      </div>

      <div className="flex items-center gap-4">
        {username ? (
          <>
            <span className="text-gray-600">
              Zalogowany jako: <strong>{username}</strong>
            </span>

            <Link to="/user" className="text-sm text-blue-600 hover:underline">
              Profil
            </Link>

            {role === 'admin' && (
              <Link to="/admin" className="text-sm text-red-600 hover:underline">
                Panel administratora
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Wyloguj
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500 hover:underline">
              Logowanie
            </Link>
            <Link to="/register" className="text-blue-500 hover:underline">
              Rejestracja
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
