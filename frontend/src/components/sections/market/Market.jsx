import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import DashboardSidebar from '../../DashboardSidebar';
import MarketSearchForm from './MarketSearchForm';
import MarketItemCard from './MarketItemCard';
import axios from 'axios';
import Hero from '../../common/Hero';

const Market = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Samochody');
  const [ads, setAds] = useState([]); // ogłoszenia

  const categories = ['Samochody', 'Motocykle', 'Części', 'Narzędzia'];

  // pobiera ogłoszenia z backendu na podstawie filtrów
  const fetchAds = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const res = await axios.get(`http://localhost:5000/api/ads?${params}`);

    const cleanedAds = (res.data || []).map(ad => ({
      ...ad,
      image_urls: typeof ad.image_urls === 'string' ? JSON.parse(ad.image_urls) : ad.image_urls
    }));

    setAds(cleanedAds);
  } catch (err) {
    console.error('Błąd pobierania ogłoszeń:', err);
  }
};


  // odśwież ogłoszenia po zmianie kategorii
  useEffect(() => {
    fetchAds({ category: selectedCategory });
  }, [selectedCategory]);

  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <Hero slug="market" />
      <div className="mb-6">
        {/* KATEGORIE + DODAJ OGŁOSZENIE */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-900 dark:bg-gray-700 dark:text-white'
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('/market/add')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Dodaj ogłoszenie
          </button>
        </div>

        {/* FORMULARZ SZUKANIA */}
        <MarketSearchForm
          selectedCategory={selectedCategory}
          onSearch={(params) => fetchAds(params)}
        />
      </div>

      {/* OGŁOSZENIA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <MarketItemCard key={ad.id} ad={ad} />
        ))}
      </div>
    </Layout>
  );
};

export default Market;
