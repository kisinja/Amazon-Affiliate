const express = require('express');
const router = express.Router();

const { updateUserProfile, getUserProfile, login, register } = require('../controllers/users');

const authUser = require('../middleware/authUser');
const upload = require('../middleware/multer');

// Update user profile
router.put(
    '/profile',
    authUser,
    upload.single('profilePicture'),
    updateUserProfile
);

router.get('/profile', authUser, getUserProfile);

router.post('/login', login);
router.post('/register', register);

module.exports = router;