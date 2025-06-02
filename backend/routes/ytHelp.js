const express = require('express');
const router = express.Router();
const ytHelpController = require('../controllers/ytHelpController');

// GET /api/yt-help/keyword
router.get('/keyword', ytHelpController.getKeyword);
router.get('/search/:query', ytHelpController.searchYoutube);

module.exports = router;
