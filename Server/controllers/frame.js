const Frame = require('../models/frame');

module.exports.addNewFrame = async (req, res, next) => {
  try {
    const { typeOfFrame } = req.body;
    const frame = new Frame({ typeOfFrame });
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
    const frame = await Frame.findOneAndDelete(req.params.fid);
    res.json(frame);
  } catch (e) {
    res.send(e);
  }
};

module.exports.updateFrame = async (req, res, next) => {
  try {
    const frame = await Frame.findOneAndUpdate(req.params.fid, {
      ...req.body,
    });
    res.json(frame);
  } catch (e) {
    res.send(e);
  }
};
