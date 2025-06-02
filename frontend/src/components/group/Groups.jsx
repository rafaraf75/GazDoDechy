import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';
import RightSidebar from '../RightSidebar';
import Hero from '../common/Hero'; // ZWRÓĆ UWAGĘ na ścieżkę, popraw jeśli inna
import axios from 'axios';

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/groups');
        setGroups(res.data);
      } catch (err) {
        console.error('Błąd pobierania grup:', err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <Hero slug="groups" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-transparent hover:border-blue-500 cursor-pointer"
            onClick={() => window.location.href = `/groups/${group.slug}`}
          >
            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{group.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{group.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Groups;
