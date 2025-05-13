import React from 'react';
import Layout from '../Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../RightSidebar';

const UserAds = () => {
  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold mb-2">🛒 Moje ogłoszenia</h1>
      <p className="text-gray-600">Tutaj znajdziesz swoje aktywne ogłoszenia.</p>
    </div>
    </Layout>
  );
};

export default UserAds;
