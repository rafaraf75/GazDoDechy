import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../RightSidebar';
import axios from 'axios';

const UserAds = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ads/user/${userId}`);
        setAds(res.data || []);
      } catch (err) {
        console.error('Błąd pobierania ogłoszeń:', err);
      }
    };
    fetchAds();
  }, [userId]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Czy na pewno chcesz usunąć to ogłoszenie?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/ads/${id}`);
      setAds((prev) => prev.filter(ad => ad.id !== id));
    } catch (err) {
      console.error('Błąd usuwania:', err);
      alert('Nie udało się usunąć ogłoszenia.');
    }
  };

  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Moje ogłoszenia</h1>

        {ads.length === 0 ? (
          <p>Nie masz jeszcze żadnych ogłoszeń.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ads.map(ad => (
              <div key={ad.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-gray-100">
                <img
                  src={ad.image_url || '/fallback.jpg'}
                  alt={ad.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{ad.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rok: {ad.year} | {ad.price} zł</p>

                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Usuń
                  </button>
                  <button
                    onClick={() => navigate(`/market/edit/${ad.id}`)}

                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edytuj
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserAds;
