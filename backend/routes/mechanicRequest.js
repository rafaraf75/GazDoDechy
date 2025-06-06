const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequestsByUser,
  deleteRequest,
  getAllRequests,
  archiveRequest,
  getArchivedRequests,
  getRequestsWithReplies,
} = require('../controllers/mechanicRequestController');

router.post('/', createRequest);
router.get('/', getAllRequests);
router.get('/user/:id', getRequestsByUser);
router.delete('/:id', deleteRequest);
router.patch('/:id/archive', archiveRequest);
router.get('/archived', getArchivedRequests);
router.get('/with-replies/:user_id', getRequestsWithReplies);

module.exports = router;
