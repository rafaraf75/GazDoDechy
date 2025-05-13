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
    <h1 className="text-2xl font-bold text-gray-800">Witaj, {username}!</h1>
  </div>

  <div className="space-y-4">
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Dodaj post</h2>
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
      <h2 className="text-lg font-semibold mb-2">Ostatnie posty</h2>
      <div className="text-sm text-gray-500 italic">
        posty...
      </div>
    </div>
  </div>
</Layout>
  );
};

export default Dashboard;
