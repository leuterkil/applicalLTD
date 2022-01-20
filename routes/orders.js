const express = require('express');
const router = express.Router();
const order = require('../controllers/order');
const { isLoggedIn, validateOrder } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router
  .route('/new')
  .post(isLoggedIn, validateOrder, catchAsync(order.newOrder));
router.route('/all').get(isLoggedIn, catchAsync(order.AllOrders));
router
  .route('/customer/:cid')
  .get(isLoggedIn, catchAsync(order.findOrderByCustomer));

router
  .route('/:oid')
  .get(isLoggedIn, catchAsync(order.showOrder))
  .put(isLoggedIn, validateOrder, catchAsync(order.updateOrder))
  .delete(isLoggedIn, catchAsync(order.deleteOrder));

module.exports = router;
