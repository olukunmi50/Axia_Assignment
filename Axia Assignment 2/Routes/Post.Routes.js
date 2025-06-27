const express = require('express');
const router = express.Router();

const { createPost, getMyPosts } = require('../Controllers/Post.Controllers');
const authorize = require('../Middleware/authMiddleware');

// Create a new post (authenticated user)
router.post('/create', authorize, createPost);

// Get current user's posts
router.get('/mine', authorize, getMyPosts);



module.exports = router;
