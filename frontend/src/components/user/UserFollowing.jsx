import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../common/Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../chat/RightSidebar';
import Hero from '../common/Hero';

const UserFollowing = () => {
  const [followedAds, setFollowedAds] = useState([]);
  const [mechanicReplies, setMechanicReplies] = useState([]);
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

    const fetchMechanicReplies = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/mechanic-request/with-replies/${userId}`);
        setMechanicReplies(res.data || []);
      } catch (err) {
        console.error('Błąd pobierania odpowiedzi od mechanika:', err);
      }
    };

    if (userId) {
      fetchFollowedAds();
      fetchMechanicReplies();
    }
  }, [userId]);

  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
      <Hero slug="user-following" />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Obserwowane ogłoszenia</h2>
        {followedAds.length === 0 ? (
          <p>Nie obserwujesz jeszcze żadnych ogłoszeń.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {followedAds.map(ad => (
              <div key={ad.id} className="bg-white dark:bg-gray-800 p-4 rounded border border-[#b87333] shadow text-gray-900 dark:text-gray-100">
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

        {/* Odpowiedzi od mechanika */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Odpowiedzi od mechanika</h2>
          {mechanicReplies.length === 0 ? (
            <p>Brak odpowiedzi od mechanika.</p>
          ) : (
            <div className="space-y-4">
              {mechanicReplies.map(req => (
                <div key={req.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded border border-[#b87333]">
                  <p className="font-semibold">Opis zgłoszenia:</p>
                  <p className="text-sm mb-2">{req.description}</p>

                  <p className="font-semibold">Odpowiedź mechanika:</p>
                  <p className="text-sm text-green-600 dark:text-green-300">{req.reply}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserFollowing;
