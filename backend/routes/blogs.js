const express = require('express');

const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogsByTag
} = require('../controllers/blogs');
const upload = require('../middleware/multer');
const authUser = require('../middleware/authUser');

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', upload.single('imageUrl'), createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/tag', getBlogsByTag);

module.exports = router;