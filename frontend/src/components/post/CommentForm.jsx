import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');

      const res = await axios.post(
        `http://localhost:5000/api/comments/${postId}`,
        { content, user_id: userId }
      );

      setContent('');
      if (onCommentAdded) {
        onCommentAdded(res.data);
      }
    } catch (err) {
      console.error('Błąd dodawania komentarza:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm"
        rows={2}
        placeholder="Dodaj komentarz..."
      />
      <button
        type="submit"
        disabled={loading}
        className="self-end px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50"
      >
        {loading ? 'Dodawanie...' : 'Skomentuj'}
      </button>
    </form>
  );
};

export default CommentForm;
