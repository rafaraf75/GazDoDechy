import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../chat/RightSidebar';
import axios from 'axios';
import PostImageSlider from '../post/PostImageSlider';
import Hero from '../common/Hero';

const UserVehicles = () => {
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

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

  const handleEdit = (postId) => {
    navigate(`/post/edit/${postId}`);
  };

  const handleDelete = async (postId) => {
    const confirm = window.confirm('Czy na pewno chcesz usunąć ten pojazd?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        data: { user_id: localStorage.getItem('userId') }
      });
      setUserPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error('Błąd usuwania pojazdu:', err);
      alert('Wystąpił błąd przy usuwaniu pojazdu.');
    }
  };

  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
      <Hero slug="user-vehicles" />
      <div className="text-gray-900 dark:text-white p-4">
        {userPosts.length === 0 ? (
          <p className="text-gray-500 italic">Tutaj pojawi się lista Twoich pojazdów.</p>
        ) : (
          <div className="space-y-6">
            {userPosts.map((post, idx) => (
              <div
                key={idx}
                className="w-full bg-white dark:bg-gray-800 p-4 rounded border border-[#b87333] shadow"
              >
                {post.post_images?.length > 0 && (
                  <PostImageSlider images={post.post_images} />
                )}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    {post.description || 'Brak opisu'}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserVehicles;