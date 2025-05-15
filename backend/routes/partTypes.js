const express = require('express');
const router = express.Router();
const partTypeController = require('../controllers/partTypeController');

router.get('/', partTypeController.getAllPartTypes);

module.exports = router;
