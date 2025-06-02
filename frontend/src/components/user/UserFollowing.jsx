import React from 'react';
import Layout from '../Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../RightSidebar';
import Hero from '../common/Hero';

const UserFollowing = () => {
  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
      <Hero slug="user-following" />

    </Layout>
  );
};

export default UserFollowing;
