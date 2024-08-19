const express = require('express');
const createError = require('http-errors');
const session = require('express-session');
const compression = require('compression');
const mongoSanitizer = require('express-mongo-sanitize');
const foodRoute = require('./routes/food-route');
const authRoute = require('./routes/auth-route.js');
const userRoute = require('./routes/user-route.js');

const app = express();

app.use(compression());
app.use(express.json());
app.use(mongoSanitizer());
app.use(express.static('../client/build'));

let secure = false;
if (app.get('env') === 'production') {
  secure = true;
}
app.use(session({
  secret: process.env.SECRET,
  name: 'id',
  saveUninitialized: false,
  resave: false,
  cookie: { 
    maxAge: 1200000,
    secure: secure,
    httpOnly: true,
    sameSite: 'strict'
  }
}));

app.use('/auth', authRoute);
app.use('/food-buds/api/v1', foodRoute);
app.use('/api/v1', userRoute);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res) {
  //Only provide err in dev
  let error = {};
  if (app.get('env') === 'development') {
    error = err;
    console.error(err.message);
  }
  res.status(err.status || 500);
  res.json({error: error});
});

module.exports = app;