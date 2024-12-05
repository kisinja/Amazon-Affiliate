const express = require('express');
const router = express.Router();

const { addToWishList, getWishList, removeFromWishList } = require('../controllers/wishlist');

const authUser = require('../middleware/authUser');

router.route('/').post(authUser, addToWishList).get(authUser, getWishList);

router.route('/:id').delete(authUser, removeFromWishList);

module.exports = router;