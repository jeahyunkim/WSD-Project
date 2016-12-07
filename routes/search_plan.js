var express = require('express');
var router = express.Router();
var schedule = require('../models/schedule.js');

router.get('/', function (req, res) {
     var title = req.param('searchTitle');
    schedule.find({title: new RegExp(title, 'i')}, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.render('schedule_list', {title: 'Express', scheduleList: result});
    });
});


router.get('/list', function (req, res, next) {

});


module.exports = router;