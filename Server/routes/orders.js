const express = require('express');
const router = express.Router();
const order = require('../controllers/order');
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/new').post(catchAsync(order.newOrder));
router.route('/all').get(catchAsync(order.AllOrders));

router
  .route('/:oid')
  .get(catchAsync(order.showOrder))
  .put(catchAsync(order.updateOrder))
  .delete(catchAsync(order.deleteOrder));

module.exports = router;
