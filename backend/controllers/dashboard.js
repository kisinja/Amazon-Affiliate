const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

const getDashBoardData = async (req, res) => {
    try {
        const users = await User.find({});
        const categories = await Category.find({});
        const products = await Product.find({});

        res.status(200).json({ users: users.length, categories: categories.length, products: products.length, success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = { getDashBoardData };