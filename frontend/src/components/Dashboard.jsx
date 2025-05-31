import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import DashboardSidebar from './DashboardSidebar';
import RightSidebar from './RightSidebar';
import PostFeed from './post/PostFeed';
import PostForm from './post/PostForm';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data || []);
    } catch (err) {
      console.error('Błąd pobierania postów:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <div className="space-y-4">
        <PostForm onPostAdded={fetchPosts} />
        <PostFeed posts={posts} loading={loading} />
      </div>
    </Layout>
  );
};

export default Dashboard;
