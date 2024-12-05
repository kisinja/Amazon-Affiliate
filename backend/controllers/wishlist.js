const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Add products to wishlist
// @route   POST /wishlist
// @access  Private
const addToWishList = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ success: false, message: 'Product already in wishlist' });
        }

        user.wishList.push(productId);
        await user.save();

        res.json({ success: true, message: 'Product added to wishlist' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }

};

// @desc    Get all products in wishlist
// @route   GET /wishlist
// @access  Private
const getWishList = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate('wishList');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, wishList: user.wishList });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });

    }
};

// @desc    Remove product from wishlist
// @route   DELETE /wishlist/:id
// @access  Private
const removeFromWishList = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const productId = req.params.id;
        if (!user.wishList.includes(productId)) {
            return res.status(400).json({ success: false, message: 'Product not in wishlist' });
        }

        const newWishList = user.wishList.filter((id) => id !== productId);
        user.wishList = newWishList;
        await user.save();

        res.json({ success: true, message: 'Product removed from wishlist' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addToWishList,
    getWishList,
    removeFromWishList
};