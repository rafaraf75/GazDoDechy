const express = require('express');
const router = express.Router();
const {
  getCommentsByPostId,
  addComment
} = require('../controllers/commentsController');

// GET - lista komentarzy do posta
router.get('/:postId', getCommentsByPostId);

// POST - dodanie komentarza (wymaga logowania)
router.post('/:postId', addComment);

module.exports = router;
