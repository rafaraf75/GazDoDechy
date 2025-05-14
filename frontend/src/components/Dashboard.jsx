import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
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
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Witaj, {username}!
        </h1>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Dodaj post</h2>
          <textarea
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Opisz swoje auto, dodaj zdjęcie..."
          ></textarea>
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Dodaj
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Ostatnie posty</h2>
          <div className="text-sm text-gray-500 dark:text-gray-300 italic">
            posty...
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
