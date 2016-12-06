var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');

/* Get Models */
var schedule_detail = require('../models/schedule_detail.js');
var schedule = require('../models/schedule.js');
var comment = require('../models/comment.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  schedule_detail.find({}).sort({detailDate: 'desc'}).exec(function(err, details){
    comment.find({},function (err, comments) {
      res.render('timeline', { title: 'Time Line', order: 'Date', details: details, comments: comments });
    });
  });
});

router.get('/recommend', function(req, res, next) {
  schedule_detail.find({}).sort({detailDate: 'desc'}).exec(function(err, details){
    comment.find({},function (err, comments) {
      res.render('timeline', { title: 'Time Line', order: 'Recommend', details: details, comments: comments });
    });
  });
});
router.get('/comments', function(req, res, next) {
  schedule_detail.find({}).sort({detailDate: 'desc'}).exec(function(err, details){
    comment.find({},function (err, comments) {
      res.render('timeline', { title: 'Time Line', order: 'Comments', details: details, comments: comments });
    });
  });
});

module.exports = router;
