const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventsController');

router.get('/', controller.getAllEvents);
router.get('/:id', controller.getEventById);
router.post('/', controller.createEvent);
router.post('/:id/attend', controller.joinEvent);
router.get('/:id/is-attending', controller.isAttending);
router.delete('/:id', controller.deleteEvent);

module.exports = router;
