const express = require('express');
const router = express.Router();
const controller = require('../controllers/adFollowController');

router.post('/follow', controller.followAd);
router.post('/unfollow', controller.unfollowAd);
router.get('/:userId', controller.getFollowedAdsByUser);

module.exports = router;
