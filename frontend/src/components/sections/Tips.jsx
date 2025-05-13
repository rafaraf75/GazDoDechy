import React from 'react';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';
import RightSidebar from '../RightSidebar';

const Tips = () => {
  return (
    <Layout leftSidebar={<DashboardSidebar />}  rightSidebar={<RightSidebar />}>
      <h1 className="text-2xl font-bold mb-4">Porady „Jak to naprawić”</h1>
      <p className="text-gray-600">Tu znajdziesz porady, filmy i materiały naprawcze.</p>
    </Layout>
  );
};

export default Tips;
