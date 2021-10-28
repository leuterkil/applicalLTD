const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const customer = require('../controllers/customer');
const { isLoggedIn, validateCustomer } = require('../middleware');

router
  .route('/new')
  .post(isLoggedIn, validateCustomer, catchAsync(customer.addNewCustomer));
router.route('/all').get(isLoggedIn, catchAsync(customer.findAllCustomers));
router
  .route('/:cid')
  .delete(isLoggedIn, catchAsync(customer.deleteCustomerById))
  .put(isLoggedIn, validateCustomer, catchAsync(customer.UpdateCustomerById))
  .get(isLoggedIn, catchAsync(customer.findCustomerById));

module.exports = router;
