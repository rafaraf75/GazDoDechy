import React, { useEffect, useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import PostForm from './PostForm';
import PostImageSlider from './PostImageSlider';
import PostReactions from './PostReactions';
import axios from 'axios';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsMap, setCommentsMap] = useState({});
  const [openComments, setOpenComments] = useState({});

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
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white"
          >
            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {post.users?.username}
            </div>
            <p className="mb-2">{post.description}</p>

            {post.post_images?.length > 0 && (
              <div className="mb-3">
                <PostImageSlider images={post.post_images} />
              </div>
            )}

            {/* REAKCJE */}
            <PostReactions postId={post.id} />

            {/* KOMENTARZE */}
            <button
              onClick={() =>
                setOpenComments((prev) => ({
                  ...prev,
                  [post.id]: !prev[post.id],
                }))
              }
              className="text-sm text-blue-500 hover:underline mt-2"
            >
              {openComments[post.id]
                ? 'Ukryj komentarze'
                : `Pokaż komentarze ${post.comment_count ? `(${post.comment_count})` : ''}`}
            </button>

            <CommentForm
              postId={post.id}
              onCommentAdded={(newComment) => {
                setCommentsMap((prev) => ({
                  ...prev,
                  [post.id]: newComment,
                }));
              }}
            />

            {openComments[post.id] && (
              <CommentList postId={post.id} newComment={commentsMap[post.id]} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostFeed;
