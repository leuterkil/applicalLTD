const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FrameSchema = new Schema({
  typeOfFrame: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  window: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Frame', FrameSchema);
