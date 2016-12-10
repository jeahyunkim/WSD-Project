/**
 * Created by jinho on 2016-11-21.
 */
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var assert = require('assert');
var multer = require('multer');
var path = require('path');
var router = express.Router();

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        console.log(process.cwd());
        console.log(path.join(process.cwd()+'/public/uploads/'));
        callback(null, path.join(process.cwd()+'/public/uploads/'));
    },
    filename: function (request, file, callback) {
        console.log(file);
        var fileName = Date.now() + file.originalname;
        console.log('aa : '+fileName);
        callback(null, fileName);
        request.body.fileName = fileName;
    }
});

var upload = multer({storage: storage}).single('photo');

var removeDuple = function removeDupl(arr){
    var preArr = arr;
    var curArr =[];
    var arrNum = 0;
    preArr.sort();
    while(preArr.length>0){
        var tempArr = preArr.shift();
        if(arrNum==0){
            curArr.push(tempArr);
            arrNum++
        }else if(curArr[arrNum-1] != tempArr){
            curArr.push(tempArr);
            arrNum++;
        }
    }
    return curArr;
}
/*
var schema = new Schema({
    'title' : String,
    'startDate' : Date,
    'endDate' : Date,
    'location' : String,
    'detailLocation' : String,
    'description' : String,
    'recommend' : Number,
    'imageUrl' : String,
    'author' : String,
    'writeDate' : String,
    'public' : Boolean
});

var schedule = mongoose.model('schedule',schema);
 */

/* Get Models */
var schedule_detail = require('../models/schedule_detail.js');
var schedule = require('../models/schedule.js');
var user = require('../models/user');


/* GET home page. */

router.get('/register', function(req, res, next) {
    res.render('schedule_register', { title: 'Express', isLogin:req.session.userInfo });
});
router.post('/add', function(req, res, next) {
    upload(req,res, function (err) {
       if(err){
           console.log('ERROR');
           console.log(err);
           return;
       }
       console.log(req);
        var currentDate = new Date();
        var addSchedule = new schedule();
        addSchedule.title = req.body.title;
        addSchedule.location = req.body.location;
        addSchedule.detailLocation = req.body.detailLocation;
        addSchedule.startDate = req.body.startDate;
        addSchedule.endDate = req.body.endDate;
        addSchedule.description = req.body.description;
        addSchedule.recommend = 0;
        if(!req.file){
            addSchedule.imageUrl='';
        }else {
            addSchedule.imageUrl = req.file.filename;
        }
        addSchedule.author =  req.session.userInfo.user_id;
        addSchedule.writeDate = currentDate.getFullYear() +'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate() ;
        addSchedule.public = req.body.publicType;
        addSchedule.save(function (err,result) {
            if(err) console.log("Something went wrong while saving the thing");
            else console.log("Thing was successfully saved");
        });
    });

    res.redirect('/schedule/list');
});

router.get('/list', function(req, res, next){
    schedule.find({},function (err, result) {
        assert.equal(err,null);
        res.render('schedule_list', { title: 'Express' ,scheduleList: result});
    });
});

router.get('/list_detail/:schedule_id', function(req, res){
    schedule.findById(req.params.schedule_id, function (err, schedule) {
        if(err) console.log("Error!!");
        else{
            var dates = [];
            var detail_id = [];
            var detail_check  = [];
            var detail_title = [];
            var detail_content = [];
            var detail_recommend = [];
            var detail_pic = [];
            var date = new Date(schedule.startDate).getTime();
            var date_gap = (schedule.endDate - schedule.startDate) / (60 * 60 * 24 * 1000) + 1;
                schedule_detail.find({scheduleID: req.params.schedule_id}, function (err, details) {
                    for (var i = 0; i < date_gap; i++) {
                        dates.push(new Date(date).toDateString());
                        for (var j = 0; j < details.length; j++) {
                            if (details[j].detailDate.toDateString() === new Date(date).toDateString()) {
                                detail_check[i] = true;
                                detail_id[i] = details[j]._id;
                                detail_title[i] = details[j].title;
                                detail_content[i] = details[j].contents;
                                detail_pic[i] = details[j].pictureName;
                                detail_recommend[i] = details[j].recommend;
                                break;
                            }
                        }
                        date += (24 * 60 * 60 * 1000);
                    }
                    res.render('schedule_list_detail', {
                        title: 'Schedule Detail',
                        schedule: schedule,
                        date_gap: date_gap,
                        dates: dates,
                        check: detail_check,
                        detail_title: detail_title,
                        detail_content: detail_content,
                        detail_pic: detail_pic,
                        detail_id: detail_id,
                        detail_recommend: detail_recommend
                    });
                });

        }
    });
});
router.get('/addBookmark/:schedule_id',function(req,res){
    user.findOne({_id : req.session.userInfo.user_id}, function(err, docs){
        for(var i = 0; i < docs.bookmarkID.length; i++)
            if(docs.bookmarkID[i] == req.params.schedule_id)
                return res.redirect('/schedule/list');
        docs.bookmarkID.push(req.params.schedule_id);
        docs.save();
        res.redirect('/schedule/list');
    })
})

module.exports = router;
