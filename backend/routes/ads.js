const express = require('express');
const router = express.Router();
const adsController = require('../controllers/adsController');

router.get('/', adsController.getAllAds);
router.get('/:id', adsController.getAdById);
router.post('/', adsController.createAd);
router.put('/:id', adsController.updateAd);
router.delete('/:id', adsController.deleteAd);

module.exports = router;
