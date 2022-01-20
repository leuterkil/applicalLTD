const Frame = require('../models/frame');
const { cloudinary } = require('../cloudinary');

module.exports.addNewFrame = async (req, res, next) => {
  try {
    console.log(req.files);
    console.log(req.body);

    const { typeOfFrame } = req.body;
    const frame = new Frame({ typeOfFrame });
    frame.frameImage = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));

    await frame.save();
    res.json(frame);
  } catch (e) {
    res.send(e);
  }
};

module.exports.findFrame = async (req, res, next) => {
  const frame = await Frame.findById(req.params.fid);
  res.json(frame);
};
module.exports.findAllFrames = async (req, res, next) => {
  const frames = await Frame.find({});
  res.json(frames);
};
module.exports.deleteFrame = async (req, res, next) => {
  try {
    const frame = await Frame.findByIdAndDelete(req.params.fid);
    res.json(frame);
  } catch (e) {
    res.send(e);
  }
};

module.exports.updateFrame = async (req, res, next) => {
  try {
    const frame = await Frame.findByIdAndUpdate(req.params.fid, {
      ...req.body,
    });
    res.json(frame);
  } catch (e) {
    res.send(e);
  }
};
