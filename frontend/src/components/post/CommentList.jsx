import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ postId, newComment }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${postId}`);
        setComments(res.data || []);
      } catch (err) {
        console.error('Błąd ładowania komentarzy:', err);
      }
    };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    if (
      newComment &&
      newComment.post_id === postId &&
      !comments.some((c) => c.id === newComment.id)
    ) {
      setComments((prev) => [newComment, ...prev]);
    }
  }, [newComment, postId, comments]);

  if (comments.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Brak komentarzy.</p>;
  }

  return (
    <div className="mt-3 space-y-2">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm text-gray-800 dark:text-gray-200"
        >
          <div className="flex items-center mb-1">
            {comment.users?.profilePicture && (
              <img
                src={comment.users.profilePicture}
                alt="avatar"
                className="w-5 h-5 rounded-full mr-2 object-cover"
              />
            )}
            <span className="font-semibold mr-2">{comment.users?.username}</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
