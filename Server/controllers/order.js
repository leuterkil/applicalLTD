const Order = require('../models/order');

module.exports.newOrder = async (req, res, next) => {
  try {
    const { orderDate, address, notes } = req.body;
    const { content } = req.body.content;
    const order = new Order(orderDate, address, notes);
    order.content = content.map((detail) => ({
      frameHeight: detail.frameHeight,
      frameLength: detail.frameLength,
      qty: detail.qty,
      price: detail.price,
      frameDesc: detail.frameDesc._id,
    }));
    await order.save;
    res.json(order);
  } catch (e) {
    res.send(e);
  }
};
