const express = require('express');
const router = express.Router();
const frame = require('../controllers/frame');
const { isLoggedIn, validateFrame } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
  .route('/new')
  .post(
    isLoggedIn,
    upload.array('image'),
    validateFrame,
    catchAsync(frame.addNewFrame)
  );
router.route('/all').get(isLoggedIn, catchAsync(frame.findAllFrames));
router
  .route('/:fid')
  .get(isLoggedIn, catchAsync(frame.findFrame))
  .delete(isLoggedIn, catchAsync(frame.deleteFrame))
  .put(isLoggedIn, validateFrame, catchAsync(frame.updateFrame));

module.exports = router;
