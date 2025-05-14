import React from 'react';
import Layout from '../../Layout';
import DashboardSidebar from '../../DashboardSidebar';
import MarketCategory from './MarketCategory';
import MarketSearchForm from './MarketSearchForm';
import MarketItemCard from './MarketItemCard';

const Market = () => {
  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Autogiełda</h1>

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
