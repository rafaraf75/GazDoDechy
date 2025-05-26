import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import DashboardSidebar from './DashboardSidebar';
import RightSidebar from './RightSidebar';
import PostFeed from './post/PostFeed';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
if (!userId) {
  navigate('/login');
}
  }, [navigate]);

  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <div className="space-y-4">

        <PostFeed />
      </div>
    </Layout>
  );
};

export default Dashboard;
