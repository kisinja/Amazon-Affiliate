const express = require('express');
const router = express.Router();

const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/categories');
const upload = require('../middleware/multer');

router.post('/', upload.single('bannerImgUrl'), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", upload.single('bannerImgUrl'), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;