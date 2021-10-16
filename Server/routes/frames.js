const express = require('express');
const router = express.Router();
const frame = require('../controllers/frame');
const { isLoggedIn } = require('../middleware');

router.route('/new').post(isLoggedIn(frame.addNewFrame));
router
  .route('/:fid')
  .delete(isLoggedIn(frame.deleteFrameById))
  .put(isLoggedIn(frame.updateFrameById))
  .get(isLoggedIn(frame.findFrameById));

module.exports = router;
