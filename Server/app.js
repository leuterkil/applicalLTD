if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
// const flash = require('connect-flash');
const path = require('path');
const adminRoutes = require('./routes/admins');
const customerRoutes = require('./routes/customers');
const frameRoutes = require('./routes/frames');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');
const Admin = require('./models/admin');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

const PORT = 4000;
//const connectMongo = require("connect-mongo");

//const MongoDBStore = new connectMongo(session);

const dbUrl = 'mongodb://localhost:27017/applicalLTD';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

// const store = new MongoDBStore({
//   url: dbUrl,
//   secret,
//   touchAfter: 24 * 60 * 60,
// });

// store.on("error", function (e) {
//   console.log("SESSION STORE ERROR", e);
// });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);
app.use(cors());
const sessionConfig = {
  // store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  //   res.locals.success = req.flash('success');
  //   res.locals.error = req.flash('error');
  next();
});
app.use('/', adminRoutes);
app.use('/customer', customerRoutes);
app.use('/frame', frameRoutes);
// app.use('/station', stationRoutes);

app.get('/', (req, res) => {
  res.send('hello');
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode);
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
