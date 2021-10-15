const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FrameSchema = new Schema({
  typeOfFrame: {
    type: String,
    required: true,
  },
  //image
});

module.exports = mongoose.model('Frame', FrameSchema);
