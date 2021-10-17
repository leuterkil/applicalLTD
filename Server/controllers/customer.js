const Customer = require('../models/customer');

module.exports.addNewCustomer = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const customer = new Customer({ firstName, lastName, phone, email });
    await customer.save();
    res.json(customer);
  } catch (e) {
    res.send(e);
  }
};
module.exports.findCustomerById = async (req, res, next) => {
  const customer = await Customer.findById(req.params.cid);
  res.json(customer);
};

module.exports.findAllCustomers = async (req, res, next) => {
  const costumers = await Customer.find({});
  res.json(costumers);
};

module.exports.deleteCustomerById = async (req, res, next) => {
  await Customer.findOneAndDelete(req.params.cid, (err, Customer) => {
    if (err) {
      res.send(err);
    } else {
      res.json(Customer);
    }
  });
};
module.exports.UpdateCustomerById = async (req, res, next) => {
  await Customer.findOneAndUpdate(
    req.params.cid,
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
