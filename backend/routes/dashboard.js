const express = require('express');
const router = express.Router();

const { getDashBoardData } = require('../controllers/dashboard');

router.route('/').get(getDashBoardData);

module.exports = router;