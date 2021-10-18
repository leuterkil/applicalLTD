const express = require('express');
const router = express.Router();
const frame = require('../controllers/frame');
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/new').post(/*isLoggedIn,*/ catchAsync(frame.addNewFrame));
router.route('/all').get(catchAsync(frame.findAllFrames));
router
  .route('/:fid')
  .get(/*isLoggedIn,*/ catchAsync(frame.findFrame))
  .delete(/*isLoggedIn,*/ catchAsync(frame.deleteFrame))
  .put(/*isLoggedIn,*/ catchAsync(frame.updateFrame));

module.exports = router;
