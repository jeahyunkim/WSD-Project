var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Mongo = require('mongodb');

var userSchema = mongoose.Schema({
  id : String,
  password : String,
  userName : String
})
var User = mongoose.model('user',userSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
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
})

module.exports = router;
