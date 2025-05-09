const express = require('express');
const router = express.Router();
const {
  blockUser,
  unblockUser,
  getUserStatus,
  getAllUserStatuses
} = require('../controllers/userStatusController');

router.post('/block', blockUser);
router.post('/unblock', unblockUser);
router.get('/:userId', getUserStatus);
router.get('/', getAllUserStatuses);

module.exports = router;
