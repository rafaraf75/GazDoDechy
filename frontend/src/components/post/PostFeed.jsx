import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm italic">
          Ładowanie postów...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm italic">
          Brak postów. Bądź pierwszy i dodaj coś!
        </div>
      ) : (
        posts.map(post => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white"
          >
            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {post.users?.username}
            </div>
            <p className="mb-2">{post.description}</p>

            {post.post_images?.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {post.post_images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={`Zdjęcie ${idx + 1}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostFeed;
