const express = require('express');
const router = express.Router();
const commentPost = require('../Controllers/commentControl');

router.post("/:postId/comment", commentPost);

module.exports = router;