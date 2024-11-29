const express = require('express');

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    compareProducts
} = require('../controllers/products');
const upload = require('../middleware/multer');
const authUser = require('../middleware/authUser');
const authAdmin = require('../middleware/authAdmin');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', upload.single("imageUrl"), createProduct);
router.put('/:id', authAdmin, updateProduct);
router.delete('/:id', authAdmin, deleteProduct);
router.get('/featured', getFeaturedProducts);
router.post('/compare', compareProducts);

module.exports = router;