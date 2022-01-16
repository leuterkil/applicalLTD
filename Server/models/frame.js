const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const FrameSchema = new Schema({
  frameImage: [ImageSchema],
  typeOfFrame: {
    type: String,
    required: true,
  },
  //image
});

module.exports = mongoose.model('Frame', FrameSchema);
