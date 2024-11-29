const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { v2: cloudinary } = require('cloudinary');

// genet=rate token
const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
};

// api to register users
const register = async (req, res) => {

    const { fullName, username, email, password } = req.body;

    if (!fullName || !email || !password || !username) {
        return res.status(400).json({ message: "All fields are required to create an account!!", success: false });
    }

    try {
        // check if user exists
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists. Please Login !!", success: false });
        }

        // check email and password validity
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email!", success: false });
        };

        if (password.length < 8) {
            return res.status(400).json({ message: "Password cannot be less than 8 characters!", success: false });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Please enter a strong password!", success: false });
        };

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save the user
        const newUser = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();


        const token = generateToken({ id: newUser._id });

        const user = await User.findById(newUser._id).select('-password');

        res.json({ message: "Register Successful", success: true, token, user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// api to login users
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email: email });
        if (!userExists) {
            return res.status(400).json({ message: "User does not exist !!", success: false });
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials !!", success: false });
        }

        const token = generateToken({ id: userExists._id });

        // find the user and return the user and token
        const user = await User.findById(userExists._id).select('-password');

        res.json({ message: `Welcome back '${user.username}'`, success: true, token, user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
// endpoint http://localhost:9098/api/user/profile
const getUserProfile = async (req, res) => {

    const userId = req.user;

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
const updateUserProfile = async (req, res) => {
    const { fullName, username, email, password } = req.body;

    const userId = req.user;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Update fields
        if (fullName) user.fullName = fullName;
        if (username) user.username = username;
        if (email) user.email = email;

        // If password is provided, hash it before saving
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Handle profile picture upload if provided
        if (req.file) {
            try {
                // Upload image to Cloudinary
                const result = await cloudinary.uploader.upload(req.file.path);
                user.profilePicture = result.secure_url;
            } catch (error) {
                return res.status(500).json({ message: error.message, success: false });
            }
        }

        // Save updated user
        const updatedUser = await user.save();

        // Return updated user data
        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                fullName: updatedUser.fullName,
                username: updatedUser.username,
                email: updatedUser.email,
                profilePicture: updatedUser.profilePicture,
                createdAt: updatedUser.createdAt,
            },
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = {
    login,
    register,
    getUserProfile,
    updateUserProfile
};