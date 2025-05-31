import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout';
import DashboardSidebar from '../DashboardSidebar';
import RightSidebar from '../RightSidebar';
import PostForm from '../post/PostForm';
import PostFeed from '../post/PostFeed';
import axios from 'axios';

const GroupDetails = () => {
  const { slug } = useParams();
  const userId = localStorage.getItem('userId');

  const [group, setGroup] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/groups/${slug}`);
        setGroup(res.data);

        const memberCheck = await axios.get('http://localhost:5000/api/group-members/is-member', {
          params: {
            group_id: res.data.id,
            user_id: userId,
          },
        });

        setIsMember(memberCheck.data.isMember);
      } catch (err) {
        setError('Nie znaleziono takiej grupy.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [slug, userId]);

  const handleJoin = async () => {
    try {
      await axios.post('http://localhost:5000/api/group-members', {
        group_id: group.id,
        user_id: userId,
      });
      setIsMember(true);
    } catch (err) {
      console.error('Błąd dołączania do grupy:', err);
    }
  };

  const handleLeave = async () => {
    try {
      await axios.delete('http://localhost:5000/api/group-members', {
        data: {
          group_id: group.id,
          user_id: userId,
        },
      });
      setIsMember(false);
    } catch (err) {
      console.error('Błąd opuszczania grupy:', err);
    }
  };

  if (loading) return <p className="p-4 text-gray-500">Ładowanie...</p>;

  if (error) {
    return (
      <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
        <div className="text-red-500 text-xl font-semibold p-6">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout leftSidebar={<DashboardSidebar />} rightSidebar={<RightSidebar />}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{group.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-3">{group.description}</p>

        {isMember ? (
          <button
            onClick={handleLeave}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Opuść grupę
          </button>
        ) : (
          <button
            onClick={handleJoin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Dołącz do grupy
          </button>
        )}
      </div>

      {isMember && <PostForm groupId={group.id} />}
      <PostFeed groupId={group.id} />
    </Layout>
  );
};

export default GroupDetails;
