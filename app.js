var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var make_plan = require('./routes/make_plan');
var schedule = require('./routes/schedule');
var detail_schedule = require('./routes/detail_schedule');
var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://52.78.124.66:27017/triptter');

var make_detail = require('./routes/make_detail');
// var fileUpload = require('express-fileupload');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Port Setting
app.set('port', process.env.PORT || 9000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload());
app.use('/', index);
app.use('/users', users);
app.use('/plan', make_plan);
app.use('/schedule',schedule);
app.use('/detail',make_detail);
app.use('/schedule/detail',detail_schedule);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//Create Server
var server = app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + server.address().port);
});