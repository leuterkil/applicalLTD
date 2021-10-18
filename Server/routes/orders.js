const express = require('express');
const router = express.Router();
const order = require('../controllers/order');
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/new').post(catchAsync(order.newOrder));

module.exports = router;
