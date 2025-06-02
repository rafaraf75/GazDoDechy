const express = require('express');
const router = express.Router();
const { getModelsByBrand } = require('../controllers/modelsController');

router.get('/', getModelsByBrand);

module.exports = router;
