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
        callback(null, path.join(process.cwd()+'/uploads/'));
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


/* GET home page. */

router.get('/register', function(req, res, next) {
    res.render('schedule_register', { title: 'Express' });
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
        addSchedule.imageUrl = req.file.filename;
        addSchedule.author = ' ';
        addSchedule.writeDate = currentDate.getFullYear() +'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate() ;
        addSchedule.public = req.body.publicType;
        addSchedule.save(function (err,result) {
            if(err) console.log("Something went wrong while saving the thing");
            else console.log("Thing was successfully saved");
            console.log(result);
        });
    });

    res.redirect('/schedule/list');
});

router.get('/list', function(req, res, next){
    schedule.find({author:' '},function (err, result) {
        assert.equal(err,null);
        res.render('schedule_list', { title: 'Express' ,scheduleList: result});
    });
});


module.exports = router;
