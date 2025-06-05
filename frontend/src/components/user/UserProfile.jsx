import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../chat/RightSidebar';
import Post from '../post/Post';
import axios from 'axios';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { username, bio, profilePicture } = response.data;
        setUsername(username);
        setBio(bio);
        setProfilePicture(profilePicture);
      } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
        navigate('/login');
      }
    };

    const fetchUserPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/posts');
        const userPostsOnly = data.filter(post => post.user_id === userId);
        setUserPosts(userPostsOnly);
      } catch (err) {
        console.error('Błąd pobierania postów użytkownika:', err);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, [navigate]);

  const handleEdit = (postId) => {
    navigate(`/post/edit/${postId}`);
  };

  const handleDelete = async (postId) => {
    const confirm = window.confirm('Czy na pewno chcesz usunąć ten post?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        data: { user_id: localStorage.getItem('userId') }
      });
      setUserPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error('Błąd usuwania posta:', err);
      alert('Wystąpił błąd przy usuwaniu posta');
    }
  };

  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
      {/* Profil użytkownika */}
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg  border border-[#b87333] shadow p-4">
        <div className="flex items-center space-x-4">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white text-xl font-bold">
              ?
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{username}</h2>
            <p className="text-gray-600 dark:text-gray-300">{bio || 'Opis profilu'}</p>
          </div>
        </div>
      </div>

      {/* Posty użytkownika */}
      <div className="mt-6 space-y-6  border border-[#b87333]">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Posty użytkownika
        </h3>

        {userPosts.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-300 italic">Brak postów.</p>
        ) : (
          userPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onEdit={() => handleEdit(post.id)}
              onDelete={() => handleDelete(post.id)}
              showActions={true}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;
