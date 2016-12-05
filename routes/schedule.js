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

router.get('/list', function(req, res, next){


    res.render('schedule_list', { title: 'Express' });
});


module.exports = router;
