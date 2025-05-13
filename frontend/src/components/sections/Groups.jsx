import React from 'react';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';
import RightSidebar from '../RightSidebar';

const Groups = () => {
  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <h1 className="text-2xl font-bold mb-4">Grupy tematyczne</h1>
      <p className="text-gray-600">Tu pojawią się grupy użytkowników – np. miłośnicy retro, terenówek itd.</p>
    </Layout>
  );
};

export default Groups;
