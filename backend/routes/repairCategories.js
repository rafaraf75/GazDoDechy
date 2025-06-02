const express = require('express');
const router = express.Router();
const { getRepairCategories } = require('../controllers/repairCategoriesController');

router.get('/', getRepairCategories);

module.exports = router;
