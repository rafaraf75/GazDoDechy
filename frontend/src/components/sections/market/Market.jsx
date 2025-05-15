import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import DashboardSidebar from '../../DashboardSidebar';
import MarketCategory from './MarketCategory';
import MarketSearchForm from './MarketSearchForm';
import MarketItemCard from './MarketItemCard';

const Market = () => {
  const navigate = useNavigate();

  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Autogiełda</h1>
        <button
          onClick={() => navigate('/market/add')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Dodaj ogłoszenie
        </button>
      </div>

      <MarketCategory />
      <MarketSearchForm />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Przykładowe ogłoszenia */}
        <MarketItemCard />
        <MarketItemCard />
      </div>
    </Layout>
  );
};

export default Market;
