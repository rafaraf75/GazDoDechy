import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import DashboardSidebar from './DashboardSidebar';
import RightSidebar from './RightSidebar';
import PostForm from './post/PostForm';
import PostFeed from './post/PostFeed';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Witaj, {username}!
        </h1>
      </div>

      <div className="space-y-4">
        <PostForm />
        <PostFeed />
      </div>
    </Layout>
  );
};

export default Dashboard;
