const Order = require('../models/order');

module.exports.newOrder = async (req, res, next) => {
  try {
    const { address, notes, customer, content } = req.body;
    const order = new Order({ address, notes, customer, content });
    // order.content = content.map((detail) => ({
    //   frameHeight: detail.frameHeight,
    //   frameLength: detail.frameLength,
    //   qty: detail.qty,
    //   price: detail.price,
    //   frameDesc: detail.frameDesc._id,
    // }));
    await order.save;
    res.json(order);
  } catch (e) {
    res.send(e);
  }
};
