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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Witaj, {username}!</h1>

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
          🚀 Wkrótce pojawią się tu nowe funkcje.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
