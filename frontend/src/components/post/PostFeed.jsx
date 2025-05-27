import React, { useEffect, useState } from 'react';
import PostForm from './PostForm';
import Post from './Post';
import axios from 'axios';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="space-y-6">
      <PostForm onPostAdded={fetchPosts} />

      {loading ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm italic">
          Ładowanie postów...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm italic">
          Brak postów. Bądź pierwszy i dodaj coś!
        </div>
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} showActions={false} />
        ))
      )}
    </div>
  );
};

export default PostFeed;
