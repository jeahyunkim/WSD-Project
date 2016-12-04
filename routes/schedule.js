/**
 * Created by jinho on 2016-11-21.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* Get Models */
var schedule = require('../models/schedule.js');
var schedule_detail = require('../models/schedule_detail.js');

/* GET home page. */
router.get('/register', function(req, res, next) {
    res.render('schedule_register', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
    var addSchedule = new schedule();
    addSchedule.title = req.body.title;
    addSchedule.location = req.body.location;
    addSchedule.detailLocation = req.body.detailLocation;
    addSchedule.startDate = req.body.startDate;
    addSchedule.endDate = req.body.endDate;
    addSchedule.description = req.body.description;
    addSchedule.recommend = 0;
    addSchedule.imageUrl = ' ';
    addSchedule.author = ' ';
    addSchedule.public = req.body.publicType;

    addSchedule.save(function (err) {
        if(err) console.log("Something went wrong while saving the thing");
        else console.log("Thing was successfully saved");
    });
    res.redirect('/schedule/list');
});


router.get('/list', function(req, res){
    schedule.find({}, function (err, schedules) {
        res.render('schedule_list', { title: 'Express' , schedules : schedules});
    });
});
router.get('/list_detail/:schedule_id', function(req, res){
    schedule.findById(req.params.schedule_id, function (err, schedule) {
            if(err) console.log("Error!!");
            else{
                var dates = [];
                var detail_check  = [];
                var detail_title = [];
                var detail_content = [];
                var detail_pic = [];
                var date = new Date(schedule.startDate).getTime();
                var date_gap = (schedule.endDate - schedule.startDate) / (60 * 60 * 24 * 1000) + 1;

                schedule_detail.find({scheduleID: req.params.schedule_id }, function (err, details) {
                    for (var i = 0; i < date_gap; i++) {
                        dates.push(new Date(date).toDateString());
                        for(var j =0; j < details.length; j++){
                            if(details[j].detailDate.toDateString() ===  new Date(date).toDateString()){
                                detail_check[i] = true;
                                detail_title[i] = details[j].title;
                                detail_content[i] = details[j].contents;
                                detail_pic[i] = details[j].pictureName;
                                break;
                            }
                        }
                        date += (24 * 60 * 60 * 1000);
                    }
                    console.log(detail_pic);
                    res.render('schedule_list_detail', { title: 'Schedule Detail', schedule: schedule, date_gap: date_gap, dates: dates,
                                                        check:detail_check, detail_title: detail_title, detail_content: detail_content, detail_pic : detail_pic});
                });
            }
    });
});

module.exports = router;
