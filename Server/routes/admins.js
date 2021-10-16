const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const admins = require('../controllers/admin');

router
  .route(`/register/${process.env.ADMIN_URL}`)
  .post(catchAsync(admins.addNewAdmin));

router.route(`/login/${process.env.ADMIN_URL}`).post(
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  admins.login
);
router.route('/admin/:uid').get(admins.getAdmin).delete(admins.deleteAdmin);

router.route('/admin').get(admins.getAllAdmins);

module.exports = router;
