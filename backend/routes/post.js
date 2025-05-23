const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const upload = require('../middlewares/upload'); // upload.array()

router.post('/', upload.array('images', 3), postController.createPost);
router.get('/', postController.getAllPosts);

module.exports = router;
