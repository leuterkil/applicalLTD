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
const orderRoutes = require('./routes/orders');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');
const Admin = require('./models/admin');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const helmet = require('helmet');

//const connectMongo = require("connect-mongo");

//const MongoDBStore = new connectMongo(session);

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/applicalLTD';

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
app.use(
  cors({
    origin: 'https://aplicalltd.herokuapp.com',
    methods: ['POST', 'DELETE', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);

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
//app.use(helmet());

/*const scriptSrcUrls = [
  'https://stackpath.bootstrapcdn.com',
  'https://api.tiles.mapbox.com',
  'https://api.mapbox.com',
  'https://kit.fontawesome.com',
  'https://ka-f.fontawesome.com/releases/v5.15.4/webfonts/',
  'https://ka-f.fontawesome.com',
  'https://cdnjs.cloudflare.com',
  'https://cdn.jsdelivr.net',
];
const styleSrcUrls = [
  'https://kit-free.fontawesome.com',
  'https://ka-f.fontawesome.com',
  'https://ka-f.fontawesome.com/releases/v5.15.4/webfonts/',
  'https://stackpath.bootstrapcdn.com',
  'https://api.mapbox.com',
  'https://api.tiles.mapbox.com',
  'https://fonts.googleapis.com',
  'https://use.fontawesome.com',
];
const connectSrcUrls = [
  'https://api.mapbox.com',
  'https://ka-f.fontawesome.com',
  'https://ka-f.fontawesome.com/releases/v5.15.4/webfonts/',
  'https://kit-free.fontawesome.com',
  'https://*.tiles.mapbox.com',
  'https://events.mapbox.com',
];
const fontSrcUrls = [];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        'https://ka-f.fontawesome.com',
        'https://ka-f.fontawesome.com/releases/v5.15.4/webfonts/',
        'https://kit-free.fontawesome.com',
        'https://fonts.gstatic.com',
      ],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", 'blob:'],
      childSrc: ['blob:'],
      objectSrc: [],
      imgSrc: [
        "'self'",
        'blob:',
        'data:',
        'https://res.cloudinary.com/aplicalltd/', //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        'https://res.cloudinary.com/diyjlmw18/', //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        'https://images.unsplash.com',
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);*/

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
app.use('/frame', frameRoutes);
app.use('/customer', customerRoutes);
app.use('/order', orderRoutes);

app.use(express.static(path.join(__dirname, 'client', 'build')));

// ...
// Right before your app.listen(), add this:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode);
});

const port = process.env.PORT || 4000;
const host = process.env.LOCAL_ADDRESS || '0.0.0.0';
app.listen(port, host, () => {
  //const address = app.address();
  console.log(`Server Running on port ${port}, ${host}`);
});
