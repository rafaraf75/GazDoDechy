const express = require('express');
const router = express.Router();
const {
  createReply,
  getReplyByRequest
} = require('../controllers/mechanicReplyController');

router.post('/', createReply);
router.get('/:request_id', getReplyByRequest);

module.exports = router;
