import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../RightSidebar';
import axios from 'axios';
import PostImageSlider from '../post/PostImageSlider';

const UserVehicles = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const userId = localStorage.getItem('userId');

      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        const filtered = res.data.filter(post => post.user_id === userId);
        setUserPosts(filtered);
      } catch (err) {
        console.error('Błąd ładowania pojazdów:', err);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
      <div className="text-gray-900 dark:text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Moje pojazdy</h1>

        {userPosts.length === 0 ? (
          <p className="text-gray-500 italic">Tutaj pojawi się lista Twoich pojazdów.</p>
        ) : (
          <div className="space-y-6">
            {userPosts.map((post, idx) => (
              <div key={idx} className="w-full bg-white dark:bg-gray-800 p-4 rounded shadow">
                {post.post_images?.length > 0 && (
                  <PostImageSlider images={post.post_images} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserVehicles;
