/**
 * Created by lrmuc on 2016-12-06.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schedule = require('../models/schedule.js');
var User = require('../models/user');
var Mongo = require('mongodb');

router.get('/', function(req, res, next){
    Schedule.find({author:req.session.userInfo.user_id},function (err, result) {
        res.render('mypage', { title: 'Express' ,scheduleList: result});
    });
});

router.get('/bookmark', function(req, res, next){
    User.findOne({_id : req.session.userInfo.user_id},function(err,user){
        var bookmarkList = [];
        var j =0;
        for(var i = 0; i<user.bookmarkID.length; i++){
            Schedule.findOne({_id : Mongo.ObjectID(user.bookmarkID[i])},function(err,result){
                bookmarkList[j] = result;
                j++;
                if(j == user.bookmarkID.length) {
                    res.render('mypage', {title: 'Express', scheduleList: bookmarkList});
                }
            })
        }
        if(user.bookmarkID.length == 0)
            res.render('mypage', {title: 'Express', scheduleList: bookmarkList});
    })

});
router.get('/modify',function(req, res, next) {
    User.findOne({_id : req.session.userInfo.user_id},function(err,user){
        res.render('usermodify', {title: 'Express', user: user, diff:true});
    })
})

router.post('/modify',function(req, res, next) {
    User.findOne({_id: req.session.userInfo.user_id}, function (err, user) {
        if (req.body.password == req.body.passwordConfirm) {
            user.password = req.body.password;
            user.save();
            res.render('usermodify', {title: 'Express', user: user, diff: true});
        }else {
            res.render('usermodify', {title: 'Express', user: user, diff: false});
        }
    })
})

module.exports = router;