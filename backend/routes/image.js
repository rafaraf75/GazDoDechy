const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controllers/imageController');

// Ustawiamy multer do odbioru plików (przechowujemy je w pamięci jako buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('plik'), imageController.uploadImage);

module.exports = router;
