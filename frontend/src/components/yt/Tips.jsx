import React from 'react';
import Layout from '../common/Layout';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import RightSidebar from '../chat/RightSidebar';
import YtHelp from '../yt/YtHelp';
import Hero from '../common/Hero';

const Tips = () => {
  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <Hero slug="tips" />
      {/* Sekcja z poradami */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded border border-[#b87333] shadow-md rounded p-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Porady „Jak to naprawić”</h1>
        <p className="text-gray-400 mb-6">
          Tu znajdziesz porady, filmy i materiały naprawcze.
        </p>
        {/* Komponent porad z YouTube */}
        <YtHelp />
      </div>
    </Layout>
  );
};

export default Tips;
