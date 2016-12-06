/**
 * Created by lrmuc on 2016-12-06.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schedule = require('../models/schedule.js');

router.get('/', function(req, res, next){
    Schedule.find({author:' '},function (err, result) {
        res.render('mypage', { title: 'Express' ,scheduleList: result});
    });
});

module.exports = router;
