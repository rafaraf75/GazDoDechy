import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import logoDark from '../../assets/logo-dark.png';
import logoLight from '../../assets/logo-light.png';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const isDark = theme === 'dark';

  const handleLogout = () => {
    // WYŚLIJ EVENT O WYLOGOWANIU
    if (socket && socket.connected && userId) {
      socket.emit('user_disconnected', userId);
    }

    // Wyczyść dane lokalne
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');

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
      <Link to="/dashboard" className="flex items-center gap-2">
        <img
          src={isDark ? logoDark : logoLight}
          alt="GazDoDechy logo"
          className="h-16"
        />
      </Link>

      {username && (
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <span className="text-gray-600 dark:text-gray-200">
            Zalogowany jako: <strong>{username}</strong>
          </span>

          <button
            onClick={toggleDarkMode}
            className="flex items-center border border-[#b87333] gap-1 bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {isDark ? (
              <>
                <SunIcon className="w-4 h-4" />
                Jasny
              </>
            ) : (
              <>
                <MoonIcon className="w-4 h-4" />
                Ciemny
              </>
            )}
          </button>

          <Link
            to="/user"
            className="px-4 py-2 rounded border border-[#b87333] bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Profil
          </Link>

          {role === 'admin' && (
            <>
              <Link
                to="/admin"
                className="px-4 py-2 rounded border border-[#b87333] bg-gray-300 text-gray-900 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Panel administratora
              </Link>

              <Link
                to="/mechanic-requests-admin"
                className="px-4 py-2 rounded border border-[#b87333] bg-gray-300 text-gray-900 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Zgłoszenia do mechanika
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 border border-[#b87333] rounded"
          >
            Wyloguj
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
