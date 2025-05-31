const express = require('express');
const router = express.Router();
const controller = require('../controllers/groupMemberController');

router.post('/', controller.joinGroup);
router.get('/is-member', controller.checkMembership);
router.delete('/', controller.leaveGroup);

module.exports = router;
