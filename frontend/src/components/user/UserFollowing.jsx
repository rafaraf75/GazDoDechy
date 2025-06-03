import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../RightSidebar';
import Hero from '../common/Hero';

const UserFollowing = () => {
  const [followedAds, setFollowedAds] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFollowedAds = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/followed-ads/${userId}`);
        setFollowedAds(res.data || []);
      } catch (err) {
        console.error('Błąd pobierania obserwowanych ogłoszeń:', err);
      }
    };

    if (userId) fetchFollowedAds();
  }, [userId]);

  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
      <Hero slug="user-following" />

      <div className="p-4">
        {followedAds.length === 0 ? (
          <p>Nie obserwujesz jeszcze żadnych ogłoszeń.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {followedAds.map(ad => (
              <div key={ad.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-gray-100">
                <img
                  src={ad.image_url || '/fallback.jpg'}
                  alt={ad.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{ad.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{ad.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserFollowing;
