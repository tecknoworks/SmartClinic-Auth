require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

var mainRouter = require('./routes');

var app = express();

// db setup
const { connectDb } = require('./database');

connectDb();

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());


// set file upload
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use(cookieParser());
app.use(cors());

// set routes
app.use('/', mainRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;