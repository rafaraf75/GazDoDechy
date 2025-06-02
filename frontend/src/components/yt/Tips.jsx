import React from 'react';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';
import RightSidebar from '../RightSidebar';
import YtHelp from '../yt/YtHelp';
import Hero from '../common/Hero';

const Tips = () => {
  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <Hero slug="tips" />
      {/* Sekcja z poradami */}
      <div className="max-w-6xl mx-auto bg-gray-800 border border-gray-700 shadow-md rounded p-6">
        <h1 className="text-2xl font-semibold text-white mb-2">Porady „Jak to naprawić”</h1>
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
