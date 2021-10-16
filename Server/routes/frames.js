const express = require('express');
const router = express.Router();
const frame = require('../controllers/frame');
const { isLoggedIn } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/new').post(isLoggedIn, catchAsync(frame.addNewFrame));
router
  .route('/:fid')
  .delete(isLoggedIn, catchAsync(frame.deleteFrameById))
  .put(isLoggedIn, catchAsync(frame.updateFrameById))
  .get(isLoggedIn, catchAsync(frame.findFrameById));

module.exports = router;
