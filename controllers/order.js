const Order = require('../models/order');

module.exports.newOrder = async (req, res, next) => {
  try {
    const {
      address,
      notes,
      customer,
      content,
      color,
      windowOfFrame,
      typeFrame,
    } = req.body;
    const order = new Order({
      address,
      notes,
      customer,
      content,
      color,
      windowOfFrame,
      typeFrame,
    });
    await order.save();
    res.json(order);
  } catch (e) {
    res.send(e);
  }
};

module.exports.AllOrders = async (req, res, next) => {
  const orders = await Order.find({}, null, {
    sort: { orderDate: 1 },
  }).populate('customer');
  res.json(orders);
};
module.exports.showOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.oid)
    .populate('content.frameDesc')
    .populate('customer');
  res.json(order);
};

module.exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.oid);
  res.json(order);
};

module.exports.findOrderByCustomer = async (req, res, next) => {
  const cid = req.params.cid;
  const order = await Order.find({ customer: cid });
  res.json(order);
};

module.exports.updateOrder = async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.oid, { ...req.body });
  res.json(order);
};
