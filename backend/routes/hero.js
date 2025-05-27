const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../middlewares/upload');

const {
  getHeroBySlug,
  createHero,
  updateHero,
  deleteHero
} = require('../controllers/heroController');

// Pobierz dane hero dla konkretnego sluga (np. 'grupa-offroad')
router.get('/:slug', getHeroBySlug);
router.post('/', upload.single('image'), createHero);
router.put('/:id', upload.single('image'), updateHero);
router.delete('/:id', deleteHero);

module.exports = router;
