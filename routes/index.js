var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');

var User = require('../models/user.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.id);
  if(req.session.userInfo != null)
    console.log(req.session.userInfo.user_id);
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.post('/login',function(req, res, next){
  User.findOne({id : req.body.user_id, password : req.body.user_pw},function(err,docs){
    if(err) return console.log("auth err");
    if(!docs) {
      res.redirect('/login');
      return console.log("user not find");
    }else {
      req.session.userInfo = {user_id : req.body.user_id};
      req.session.save(function (err) {
        res.redirect('/');
      })
    }
  })
})




router.post('/login/register',function(req,res,next) {
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
      res.redirect('/login');
    });
  }else{
    res.redirect('/login');
  }
});

module.exports = router;
