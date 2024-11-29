const express = require('express');
const router = express.Router();
const {
    addComment,
    getCommentsByBlogId,
    deleteComment,
} = require('../controllers/comments');

// Add a comment
router.post('/', addComment);

// Get comments for a specific blog
router.get('/:blogId', getCommentsByBlogId);

// Delete a comment
router.delete('/:id', deleteComment);

module.exports = router;