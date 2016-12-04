var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var imgNumber = 0;

var detailSchema = new Schema({
    scheduleID: String,
    title: String,
    contents: String,
    detailDate: Date,
    commentID: [String],
    pictureName: [String]
});
var Detail = mongoose.model('detail', detailSchema);

router.get('/register', function (req, res) {
    console.log(req.query.id);
    console.log(req.query.date);
    res.render('detail_register', {title: 'Express', schedule_id: req.params.schedule_id});
});

router.post('/add', function (req, res) {

    var detail = new Detail();
    //file 있는지 여부 검사
    var fileNumber = 0;
    for (x in req.files) {
        fileNumber++;
    }

    detail.scheduleID = '일본여행 아이디';
    detail.title = req.body.title;
    detail.contents = req.body.contents;
    detail.detailDate = new Date();
    var loopNumber = 0;
    for (var i = 0; i < fileNumber; i++) {
        var img = 'img' + imgNumber;

        if (i != 0 && !req.files[img].name == '') {
            detail.pictureName[loopNumber] = (req.files[img].name);
            loopNumber++;
            console.log("들어간다 " + req.files[img].name);
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
    img1 = req.files.img1;
    //  img2 = req.files.img2;
    //img3 = req.files.img3;
    imgNumber = 0;
    for (var i = 0; i < fileNumber; i++) {
        var img = 'img' + imgNumber;
        if (i != 0 && !req.files[img].name == '') {
            req.files[img].mv('/Temp/' + req.files[img].name, function (err) {
                if (err) {
                    res.status(500).send(err);
                }

            });
        }
        imgNumber++;
    }
    imgNumber = 0;
    res.send('File uploaded!');
});


module.exports = router;
