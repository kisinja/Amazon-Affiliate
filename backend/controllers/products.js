const Email = require('../models/Email');
const Product = require('../models/Product');
const sendEmail = require('../config/emailService');
const { v2: cloudinary } = require('cloudinary');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {

    const { category } = req.query;

    try {
        const products = category
            ? await Product.find({ category })
            : await Product.find({});

        res.json({
            products,
            success: true
        }).status(200);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        res.status(200).json({ product, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin only)
const createProduct = async (req, res) => {
    const { title, description, price, category, affiliateLink, featured } = req.body;

    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required", success: false });
        }

        // Upload image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);

        // Create a new product with the Cloudinary URL
        const product = new Product({
            title,
            description,
            imageUrl: cloudinaryResponse.secure_url,
            price,
            category,
            affiliateLink,
            featured,
        });

        const createdProduct = await product.save();

        // Fetch all subscriber emails
        const subscribers = await Email.find({});
        const recipientEmails = subscribers.map((sub) => sub.email);

        // Send email notification if subscribers exist
        if (recipientEmails.length > 0) {
            const subject = "New Product Alert!";
            const html = `
                <h1>New Product: ${title}</h1>
                <p>${description}</p>
                <p>Price: $${price}</p>
                <a href="#">View Product</a>
            `;

            await sendEmail(recipientEmails.join(", "), subject, "", html);
        } else {
            console.log("No subscribers found");
        }

        res.status(201).json({ createdProduct, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
const updateProduct = async (req, res) => {
    const { title, description, imageUrl, price, category, affiliateLink, featured } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.imageUrl = imageUrl || product.imageUrl;
        product.price = price || product.price;
        product.category = category || product.category;
        product.affiliateLink = affiliateLink || product.affiliateLink;
        product.featured = featured || product.featured;

        const updatedProduct = await product.save();
        res.status(200).json({ updatedProduct, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        await product.remove();
        res.status(200).json({ message: "Product deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ featured: true });
        res.status(200).json({ products, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

const compareProducts = async (req, res) => {
    try {
        const { productsIds } = req.body; // Array of product IDs
        const products = await Product.find({ _id: { $in: productsIds } }); // Queries based on the array of IDs

        if (products.length !== productsIds.length) {
            return res.status(400).json({ message: "Some products not found", success: false });
        }

        res.status(200).json({ products, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
        console.log(error.message);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    compareProducts
};