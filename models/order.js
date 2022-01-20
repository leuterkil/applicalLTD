const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  frameHeight: String,
  frameLength: String,
  frameDesc: {
    type: Schema.Types.ObjectId,
    ref: 'Frame',
  },
  qty: Number,
  price: Number,
});

const OrderSchema = new Schema({
  orderDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  address: {
    type: String,
    required: true,
  },
  color: { type: String, required: true },
  windowOfFrame: { type: String, required: true },
  typeFrame: { type: String, required: true },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  notes: String,
  content: [ContentSchema],
});

module.exports = mongoose.model('Order', OrderSchema);
