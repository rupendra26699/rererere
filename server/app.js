var cors = require('cors')
var localDb = require("./dataModels/setupDatabase");



var createError = require('http-errors');


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var authRouter = require('./routes/authentication/routes');
var projectRouter = require("./routes/project/routes")
let mockServerSetupRouter = require("./routes/mockServer/routes");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// test

app.use("/devServer", mockServerSetupRouter)

app.use('/api/v1/auth', authRouter)

app.use("/api/project", projectRouter)
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
