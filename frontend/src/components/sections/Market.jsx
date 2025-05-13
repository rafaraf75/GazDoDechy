import React from 'react';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';

const Market = () => {
  return (
    <Layout leftSidebar={<DashboardSidebar />}>
      <h1 className="text-2xl font-bold mb-4">Autogiełda</h1>
      <p className="text-gray-600">Wkrótce dodamy kategorie: samochody, motocykle, części...</p>
    </Layout>
  );
};

export default Market;
