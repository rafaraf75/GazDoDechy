const express = require('express');
const router = express.Router();
const ytHelpController = require('../controllers/ytHelpController');

router.get('/keyword', ytHelpController.getKeyword);
router.get('/search/:query', ytHelpController.searchYoutube);

module.exports = router;
