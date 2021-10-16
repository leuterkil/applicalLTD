const express = require('express');
const router = express.Router();
const customer = require('../controllers/customer');
const { isLoggedIn } = require('../middleware');

router.route('/new').post(isLoggedIn(customer.addNewCustomer));
router
  .route('/:cid')
  .delete(isLoggedIn(customer.deleteCustomerById))
  .put(isLoggedIn(customer.UpdateCustomerById))
  .get(isLoggedIn(customer.findCustomerById));

module.exports = router;
