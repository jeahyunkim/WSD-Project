
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
// default options


/* Get Models */
var schedule_detail = require('../models/schedule_detail.js');



var imgNumber = 0;

router.get('/register', function (req, res) {
    res.render('detail_register', {title: 'Express', schedule_id: req.query.id, schedule_date: req.query.date});
});

router.post('/add', function (req, res) {

    var detail = new schedule_detail();
    //file 있는지 여부 검사
    var fileNumber = 0;
    for (x in req.files) {
        fileNumber++;
        console.log("file Number : "+fileNumber);
    }

    detail.scheduleID = req.body.schedule_id;
    detail.title = req.body.title;
    detail.contents = req.body.contents;
    detail.detailDate = new Date(req.body.schedule_date);
    var loopNumber = 0;
    for (var i = 0; i < fileNumber; i++) {
        var img = 'img' + imgNumber;
        if (i != 0 && !req.files[img].name == '') {
            detail.pictureName[loopNumber] = (req.files[img].name);
            loopNumber++;
        }
        imgNumber++;
    }
    loopNumber = 0;

    //db save
    detail.save(function (err, silence) {
        if (err) {
            console.log("DB error : " + err);
            return;
        }
        console.log("DB INSERT");
    });

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    imgNumber = 0;
    for (var i = 0; i < fileNumber; i++) {
            var img = 'img' + imgNumber;
            if (i != 0 && !req.files[img].name == '') {
            req.files[img].mv(process.cwd()+'/public/uploads/detail' + req.files[img].name, function (err) {
                if (err) {
                    console.log("file not upload");
                    res.status(500).send(err);
                }
            });
        }
        imgNumber++;
    }
    imgNumber = 0;
    res.redirect('/schedule/list_detail/' + req.body.schedule_id);
    //res.send('File uploaded!');
});

module.exports = router;
