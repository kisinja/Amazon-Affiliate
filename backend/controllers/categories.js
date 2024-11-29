const Category = require('../models/Category');
const { v2: cloudinary } = require('cloudinary');

// Function to create a new category
const createCategory = async (req, res) => {


    try {
        const { name, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Banner image is required.', success: false });
        }

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const newCategory = new Category({
            name,
            description,
            bannerImgUrl: result.secure_url,
        });

        await newCategory.save();

        res.status(201).json({ message: 'Category created successfully!', category: newCategory, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Function to get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json({ categories, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Function to get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found.', success: false });
        }

        res.status(200).json({ category, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Function to update a category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found.', success: false });
        }

        let bannerImgUrl = category.bannerImgUrl;

        // If a new image is provided, upload it to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            bannerImgUrl = result.secure_url;
        }

        category.name = name || category.name;
        category.description = description || category.description;
        category.bannerImgUrl = bannerImgUrl;

        await category.save();

        res.status(200).json({ message: 'Category updated successfully!', category, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Function to delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found.', success: false });
        }

        res.status(200).json({ message: 'Category deleted successfully!', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};