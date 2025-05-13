import React from 'react';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';
import RightSidebar from '../RightSidebar';
const Events = () => {
  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <h1 className="text-2xl font-bold mb-4">Zloty i wydarzenia</h1>
      <p className="text-gray-600">Zobacz nadchodzące wydarzenia, spotkania i zloty motoryzacyjne.</p>
    </Layout>
  );
};

export default Events;
