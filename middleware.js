const { orderSchema, frameSchema, customerSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.json('You must be signed in first!');
  }
  next();
};

module.exports.validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body, { allowUnknown: true });
  console.log(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateCustomer = (req, res, next) => {
  const { error } = customerSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    console.log(error);
    res.send(error);
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateFrame = (req, res, next) => {
  const { error } = frameSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    console.log(error);
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
