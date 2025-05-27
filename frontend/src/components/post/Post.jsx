import React, { useState } from 'react';
import PostImageSlider from './PostImageSlider';
import PostReactions from './PostReactions';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Post = ({ post, onEdit, onDelete, showActions = false }) => {
  const [commentsMap, setCommentsMap] = useState({});
  const [openComments, setOpenComments] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-white">
      <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        {post.users?.username}
      </div>

      <p className="mb-2">{post.description}</p>

      {post.post_images?.length > 0 && (
        <div className="mb-3">
          <PostImageSlider images={post.post_images} />
        </div>
      )}

      {/* Reakcje */}
      {!showActions && <PostReactions postId={post.id} />}

      {/* Komentarze */}
      {!showActions && (
        <>
          <button
            onClick={() => setOpenComments(!openComments)}
            className="text-sm text-blue-500 hover:underline mt-2"
          >
            {openComments
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

          {openComments && (
            <CommentList postId={post.id} newComment={commentsMap[post.id]} />
          )}
        </>
      )}

      {/* Edytuj / Usuń */}
      {showActions && (
        <div className="flex justify-end mt-3 space-x-2">
          <button
            onClick={() => onDelete(post.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Usuń
          </button>
          <button
            onClick={() => onEdit(post.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Edytuj
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
