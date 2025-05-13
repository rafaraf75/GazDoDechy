import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import UserSidebar from './UserSidebar';
import RightSidebar from '../RightSidebar';
import axios from 'axios';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

    fetchUserData();
  }, [navigate]);

  return (
    <Layout leftSidebar={<UserSidebar />} rightSidebar={<RightSidebar />}>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <img
            src={profilePicture || 'https://i.pravatar.cc/150?u=default'}
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{username}</h2>
            <p className="text-gray-600">{bio || 'Opis profilu'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <h3 className="text-lg font-semibold mb-2">Posty użytkownika</h3>
        <p className="text-sm text-gray-500 italic">posty...</p>
      </div>
    </Layout>
  );
};

export default UserProfile;