import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCarSide, FaTools, FaRegThumbsUp, FaSkull } from 'react-icons/fa';

const REACTIONS = [
  { type: 'super_fura', label: 'Super fura', icon: <FaCarSide /> },
  { type: 'szacun', label: 'Szacun', icon: <FaTools /> },
  { type: 'spoko', label: 'Spoko', icon: <FaRegThumbsUp /> },
  { type: 'zlomek', label: 'Złomek', icon: <FaSkull /> },
];

const PostReactions = ({ postId }) => {
  const userId = localStorage.getItem('userId');
  const [counts, setCounts] = useState({});
  const [userReaction, setUserReaction] = useState(null);

  const fetchReactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reactions/${postId}`);
      const summary = res.data.summary || [];
      const users = res.data.users || [];

      const countMap = {};
      summary.forEach(r => {
        countMap[r.type] = Number(r.count);
      });
      setCounts(countMap);

      const userOwn = users.find(u => u.user_id === userId);
      setUserReaction(userOwn?.type || null);
    } catch (err) {
      console.error('Błąd pobierania reakcji:', err);
    }
  };

  const handleReaction = async (type) => {
    try {
      await axios.post('http://localhost:5000/api/reactions', {
        post_id: postId,
        user_id: userId,
        type
      });
      fetchReactions();
    } catch (err) {
      console.error('Błąd zapisu reakcji:', err);
    }
  };

  useEffect(() => {
  const fetchReactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reactions/${postId}`);
      const summary = res.data.summary || [];
      const users = res.data.users || [];

      const countMap = {};
      summary.forEach(r => {
        countMap[r.type] = Number(r.count);
      });
      setCounts(countMap);

      const userOwn = users.find(u => u.user_id === userId);
      setUserReaction(userOwn?.type || null);
    } catch (err) {
      console.error('Błąd pobierania reakcji:', err);
    }
  };

  fetchReactions();
}, [postId, userId]);

  return (
    <div className="flex items-center gap-4 mt-3 flex-wrap text-sm">
      {REACTIONS.map(({ type, label, icon }) => (
        <button
          key={type}
          onClick={() => handleReaction(type)}
          className={`flex items-center gap-1 px-2 py-1 rounded
            ${userReaction === type ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
            hover:bg-blue-500 hover:text-white transition`}
          title={label}
        >
          {icon}
          <span>{counts[type] || 0}</span>
        </button>
      ))}
    </div>
  );
};

export default PostReactions;
