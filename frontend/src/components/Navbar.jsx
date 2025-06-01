import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({theme, setTheme }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const isDark = theme === 'dark';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800 dark:text-white">
        <Link to="/dashboard">GazDoDechy</Link>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="text-sm bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {isDark ? '☀ Jasny' : '🌙 Ciemny'}
        </button>

        {username ? (
          <>
            <span className="text-gray-600 dark:text-gray-200">
              Zalogowany jako: <strong>{username}</strong>
            </span>

            <Link to="/user" className="text-sm text-blue-600 hover:underline">
              Profil
            </Link>

            {role === 'admin' && (
              <>
                <Link to="/admin" className="text-sm text-red-500 hover:underline">
                  Panel administratora
                </Link>

                <Link to="/mechanic-requests-admin" className="text-sm text-green-500 hover:underline">
                  Zgłoszenia do mechanika
                </Link>
              </>
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
