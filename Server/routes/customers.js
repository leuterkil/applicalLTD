const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const customer = require('../controllers/customer');
const { isLoggedIn } = require('../middleware');

router.route('/new').post(isLoggedIn, catchAsync(customer.addNewCustomer));
router
  .route('/:cid')
  .delete(isLoggedIn, catchAsync(customer.deleteCustomerById))
  .put(isLoggedIn, catchAsync(customer.UpdateCustomerById))
  .get(isLoggedIn, catchAsync(customer.findCustomerById));

module.exports = router;
