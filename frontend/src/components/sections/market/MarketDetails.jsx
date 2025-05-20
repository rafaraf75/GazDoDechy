import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../Layout';
import DashboardSidebar from '../../DashboardSidebar';
import axios from 'axios';

const MarketDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ads/${id}`);
        const data = res.data;
        setAd(data);
        const images = data.image_urls ? JSON.parse(data.image_urls) : [];
        if (images.length > 0) setMainImage(images[0]);
      } catch (err) {
        console.error('Błąd pobierania ogłoszenia:', err);
      }
    };
    fetchAd();
  }, [id]);

  if (!ad) return <div className="text-center p-8">Ładowanie...</div>;

  const images = ad.image_urls ? JSON.parse(ad.image_urls) : [];

  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">{ad.title}</h1>

        {/* Główne zdjęcie */}
        {mainImage && (
          <img
            src={mainImage}
            alt="Główne"
            className="w-full max-h-[70vh] object-contain rounded mb-6"
          />
        )}

        {/* Miniaturki */}
        {images.length > 1 && (
          <div className="flex gap-4 mb-6 flex-wrap">
            {images.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Miniatura ${idx + 1}`}
                onClick={() => setMainImage(url)}
                className={`w-24 h-16 object-cover rounded cursor-pointer border ${
                  mainImage === url ? 'border-blue-500' : 'border-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Szczegóły ogłoszenia */}
        <div className="space-y-1">
          <p className="mb-4">{ad.description}</p>
          <p><strong>Cena:</strong> {ad.price?.toLocaleString('pl-PL')} zł</p>
          <p><strong>Przebieg:</strong> {ad.mileage?.toLocaleString('pl-PL')} km</p>
          <p><strong>Marka:</strong> {ad.brand || '-'}</p>
          <p><strong>Model:</strong> {ad.model || '-'}</p>
          <p><strong>Rok:</strong> {ad.year || '-'}</p>
        </div>
      </div>
    </Layout>
  );
};

export default MarketDetails;
