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
    if(req.session.userInfo == null){
        res.redirect('/login');
    } else {
          schedule_detail.find({}).sort({detailDate: 'desc'}).exec(function(err, details){
            comment.find({},function (err, comments) {
              res.render('timeline', { title: 'Time Line', order: 'Date', details: details, comments: comments, user: req.session.userInfo.user_id });
            });
          });
    }
});

router.get('/recommend', function(req, res, next) {
    if(req.session.userInfo == null){
        res.redirect('/login');
    }  else {
            schedule_detail.find({}).sort({recommend: 'desc'}).exec(function(err, details){
            comment.find({},function (err, comments) {
              res.render('timeline', { title: 'Time Line', order: 'Recommend', details: details, comments: comments, user: req.session.userInfo.user_id  });
            });
          });
    }
});

router.get('/comments', function(req, res, next) {
    if(req.session.userInfo == null) {
        res.redirect('/login');
    } else {
      schedule_detail.find({}).sort({}).exec(function(err, details){
        comment.find({},function (err, comments) {
          res.render('timeline', { title: 'Time Line', order: 'Comments', details: details, comments: comments, user: req.session.userInfo.user_id  });
        });
      });
    }
});

// heart ajax code
router.post('/heart', function(req, res, next) {
  schedule_detail.findById(req.body.id, function (err, result) {
    console.log(result);
    result.recommend +=1;
    if(req.session.userInfo.user_id != null) {
      result.recommendID.push(req.session.userInfo.user_id);
    }
    result.save();
  });
  res.send({'result': true});
});

module.exports = router;
