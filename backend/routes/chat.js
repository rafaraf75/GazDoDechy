const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/users', chatController.getChatUsers);

module.exports = router;
