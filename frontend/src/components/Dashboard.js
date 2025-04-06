import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Panel użytkownika</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded text-sm"
          >
            Wyloguj
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Witaj, <strong className="text-gray-900">{username}</strong>!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded shadow-inner">
            <h2 className="text-lg font-semibold mb-2">📋 Tablica ogłoszeń</h2>
            <p className="text-sm text-gray-600">Tu będą pojawiać się ogłoszenia i przypomnienia.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded shadow-inner">
            <h2 className="text-lg font-semibold mb-2">📈 Statystyki</h2>
            <p className="text-sm text-gray-600">W tym miejscu będą np. informacje o aktywności użytkownika.</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          🚀 Tu wkrótce pojawią się dodatkowe funkcje panelu.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
