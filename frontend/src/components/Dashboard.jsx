import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import RightSidebar from './RightSidebar';

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
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      {/* Lewa kolumna – menu boczne */}
      <aside className="col-span-1 hidden md:block">
        <DashboardSidebar />
      </aside>

      {/* Główna część */}
      <main className="col-span-1 md:col-span-3">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Witaj, {username}!</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Główna część tablicy */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2"> Dodaj post</h2>
              <textarea
                className="w-full p-2 border rounded mb-2"
                placeholder="Opisz swoje auto, dodaj zdjęcie..."
              ></textarea>
              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Dodaj
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2"> Ostatnie posty</h2>
              <div className="text-sm text-gray-500 italic">
                Brak postów – wkrótce tu się coś pojawi
              </div>
            </div>
          </div>

          {/* Prawa kolumna – czat */}
          <div className="hidden md:block">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
