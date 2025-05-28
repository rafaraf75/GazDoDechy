const express = require('express');
const router = express.Router();

const {
  getHeroBySlug,
  getAllHeros,
  createHero,
  updateHero,
  deleteHero
} = require('../controllers/heroController');

// Pobierz dane hero dla konkretnego sluga (np. 'grupa-offroad')
router.get('/:slug', getHeroBySlug);
router.post('/', createHero);
router.put('/:id', updateHero);
router.delete('/:id', deleteHero);
router.get('/', getAllHeros);

module.exports = router;
