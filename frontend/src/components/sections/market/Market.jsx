import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import DashboardSidebar from '../../DashboardSidebar';
import MarketSearchForm from './MarketSearchForm';
import MarketItemCard from './MarketItemCard';

const Market = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Samochody');

  const categories = ['Samochody', 'Motocykle', 'Części', 'Narzędzia'];

  return (
    <Layout leftSidebar={<DashboardSidebar />}>
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
                    : 'bg-blue-100 text-blue-900'
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
        <MarketSearchForm selectedCategory={selectedCategory} />
      </div>

      {/* OGŁOSZENIA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MarketItemCard />
        <MarketItemCard />
      </div>
    </Layout>
  );
};

export default Market;
