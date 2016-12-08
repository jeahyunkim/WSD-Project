var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');

var User = require('../models/user.js');
/* Get Models */
var schedule_detail = require('../models/schedule_detail.js');
var comment = require('../models/comment.js');


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.session.id);
    if (req.session.userInfo != null)
        console.log("아이디 :" + req.session.userInfo.user_id);

    schedule_detail.find({}).sort({recommend: 'desc'}).exec(function (err, details) {
        comment.find({}, function (err, comments) {
            res.render('index', {
                title: 'Time Line',
                order: 'Recommend',
                details: details,
                comments: comments,
                user: req.session.userInfo.user_id
            });
        });
    });
});

router.get('/login', function(req, res, next) {
  if(req.session.userInfo != null) {
    res.redirect('/');
  }else {
    res.render('login', {title: 'Express', loginFail: false, registerSuc: false, registerFail: false});
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});


router.post('/login',function(req, res, next){
  if(req.body.but == "LOGIN") {
    User.findOne({id: req.body.user_id, password: req.body.user_pw}, function (err, docs) {
      if (err) return console.log("auth err");
      if (!docs) {
        res.render('login', {title: 'Express', loginFail: true, registerSuc: false, registerFail: false});
        return console.log("user not find");
      } else {
        req.session.userInfo = {user_id: req.body.user_id};
        req.session.save(function (err) {
          res.redirect('/');
        })
      }
    })
  } else if(req.body.but == "REGISTER"){
    if (req.body.password == req.body.passwordConfirm) {
      var user = new User({
        userName: req.body.userName,
        id: req.body.ID,
        password: req.body.password
      });
      user.save(function(err,silence){
        if(err){
          console.log(err);
          res.status(500).send('update error');
          return;
        }
        res.render('login',{ title: 'Express' , loginFail : false,registerSuc : true, registerFail : false})
      });
    }else{
      res.render('login',{ title: 'Express' , loginFail : false,registerSuc : false, registerFail : true})
    }
  }
})

module.exports = router;
