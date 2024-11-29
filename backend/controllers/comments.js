const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// @desc    Add a comment to a blog
// @route   POST /api/comments
// @access  Public
const addComment = async (req, res) => {
    const { blogId, userId, content } = req.body;

    try {
        // Check if the blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Create a new comment
        const comment = new Comment({ blogId, userId, content });
        const savedComment = await comment.save();

        // Add the comment to the blog's comments array
        blog.comments.push(savedComment._id);
        await blog.save();

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

// @desc    Get all comments for a blog
// @route   GET /api/comments/:blogId
// @access  Public
const getCommentsByBlogId = async (req, res) => {
    try {
        const comments = await Comment.find({ blogId: req.params.blogId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private (Admin/User)
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Remove the comment from the blog's comments array
        const blog = await Blog.findById(comment.blogId);
        if (blog) {
            blog.comments = blog.comments.filter((id) => id.toString() !== comment._id.toString());
            await blog.save();
        }

        await comment.remove();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};

module.exports = { addComment, getCommentsByBlogId, deleteComment };