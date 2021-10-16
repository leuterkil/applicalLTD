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

module.exports.findFramebyId = async (req, res, next) => {
  try {
    const frame = await Frame.findById(req.params.fid);
    res.json(frame);
  } catch (e) {
    res.send(e);
  }
};

module.exports.deleteFramebyId = async (req, res, next) => {
  try {
    const frame = await Frame.findByIdAndDelete(req.params.fid);
    res.json(frame);
  } catch (e) {
    res.send(e);
  }
};

module.exports.updateFramebyId = async (req, res, next) => {
  try {
    const frame = await Frame.findByIdAndUpdate(req.params.fid, {
      ...req.body,
    });
    res.json(frame);
  } catch (e) {
    res.send(e);
  }
};
