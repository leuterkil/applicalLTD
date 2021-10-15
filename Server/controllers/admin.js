const Admin = require('../models/admin');

module.exports.addNewAdmin = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const admin = new Admin({ email, username });
    const registeredAdmin = await Admin.register(admin, password);
    // login the registered user
    req.login(registeredAdmin, (err) => {
      //   if (err) return next(err);
      //   req.flash("success", "Welcome to Yelp Camp!");
      res.json(registeredAdmin);
    });
  } catch (e) {
    res.send(e);
  }
};

module.exports.login = (req, res) => {
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.send('log in');
};
module.exports.getAllAdmins = (req, res) => {
  Admin.find((err, Admin) => {
    if (err) {
      res.send(err);
    }
    res.json(Admin);
  });
};

module.exports.getAdmin = (req, res) => {
  Admin.findById(req.params.Uid, (err, Admin) => {
    if (err) {
      res.send(err);
    }
    res.json(Admin);
  });
};

module.exports.deleteAdmin = (req, res) => {
  Admin.findOneAndDelete(req.params.Uid, (err, Admin) => {
    if (err) {
      res.send(err);
    }
    res.json(Admin);
  });
};
