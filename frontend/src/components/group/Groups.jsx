import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';
import RightSidebar from '../RightSidebar';

const Groups = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroRes = await axios.get('http://localhost:5000/api/hero');
        const heroSection = heroRes.data.find((h) => h.slug === 'groups');
        setHeroData(heroSection);

        const groupsRes = await axios.get('http://localhost:5000/api/groups');
        setGroups(groupsRes.data);
      } catch (err) {
        console.error('Błąd pobierania danych:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      {loading ? (
        <p className="text-gray-500">Ładowanie...</p>
      ) : (
        <>
          {heroData && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{heroData.title}</h1>
              <p className="text-gray-600 dark:text-gray-300">{heroData.subtitle}</p>
            </div>
          )}

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
        </>
      )}
    </Layout>
  );
};

export default Groups;
