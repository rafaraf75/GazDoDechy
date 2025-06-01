const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequestsByUser,
  deleteRequest,
  getAllRequests,
  archiveRequest,
  getArchivedRequests
} = require('../controllers/mechanicRequestController');

router.post('/', createRequest);
router.get('/', getAllRequests);
router.get('/user/:id', getRequestsByUser);
router.delete('/:id', deleteRequest);
router.patch('/:id/archive', archiveRequest);
router.get('/archived', getArchivedRequests);

module.exports = router;
