const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/eventAttendanceController');

router.post('/', attendanceController.joinEvent);
router.delete('/', attendanceController.leaveEvent);
router.get('/is-attending', attendanceController.checkAttendance);

module.exports = router;
