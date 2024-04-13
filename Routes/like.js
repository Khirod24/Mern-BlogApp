const express = require('express');
const router = express.Router();
const likePost = require('../Controllers/likeControl');

router.post('/:postId/like', likePost);

module.exports = router;