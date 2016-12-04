/**
 * Created by jinho on 2016-11-21.
 */
var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var router = express.Router();

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
    'public' : Boolean
});

var schedule = mongoose.model('schedule',schema);


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
                var date = new Date(schedule.startDate).getTime();
                var date_gap = (schedule.endDate - schedule.startDate) / (60 * 60 * 24 * 1000) + 1;
                for (var i = 0; i < date_gap; i++) {
                    dates.push(new Date(date).toDateString());
                    console.log(new Date(date).toString());
                    console.log(new Date(date).toDateString());
                    date += (24 * 60 * 60 * 1000);
                }
                console.log(schedule.startDate);
                console.log(schedule.endDate);
            }

        res.render('schedule_list_detail', { title: 'Schedule Detail', schedule: schedule, date_gap: date_gap, dates: dates });
    });
});

module.exports = router;
