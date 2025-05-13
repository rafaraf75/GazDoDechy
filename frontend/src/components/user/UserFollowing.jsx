import React from 'react';
import Layout from '../Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../RightSidebar';

const UserFollowing = () => {
  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold mb-2">⭐ Obserwowane</h1>
      <p className="text-gray-600">Tutaj pojawią się użytkownicy i grupy, które obserwujesz.</p>
    </div>
    </Layout>
  );
};

export default UserFollowing;
