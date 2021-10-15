const Customer = require('../models/customer');

module.exports.addNewCustomer = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const customer = new Customer(firstName, lastName, phone, email);
    await customer.save();
    res.json(customer);
  } catch (e) {
    res.send(e);
  }
};
module.exports.findCustomerById = async (req, res, next) => {
  await Customer.findById(req.params.uid, (err, Customer) => {
    if (err) {
      res.send(err);
    } else {
      res.json(Customer);
    }
  });
};
module.exports.deleteCustomerById = async (req, res, next) => {
  await Customer.findOneAndDelete(req.params.uid, (err, Customer) => {
    if (err) {
      res.send(err);
    } else {
      res.json(Customer);
    }
  });
};
module.exports.UpdateCustomerById = async (req, res, next) => {
  await Customer.findOneAndUpdate(
    req.params.uid,
    { ...req.body },
    (err, Customer) => {
      if (err) {
        res.send(err);
      } else {
        res.json(Customer);
      }
    }
  );
};
