var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var detailSchema = new Schema({
    scheduleID: String,
    title: String,
    contents: String,
    detailDate: Date,
    commentID: [String],
    pictureName: [String]
});
var Detail = mongoose.model('detail', detailSchema);

router.get('/register', function (req, res, next) {
    res.render('detail_register', {title: 'Express'});
});

router.post('/add', function (req, res) {
    var img1 = req.files.img1;
    //var img2 = req.file.img2;
    //var img3 = req.file.img3;

    var detail = new Detail();

    //
    detail.scheduleID = '일본여행 아이디';
    detail.title = req.body.title;
    detail.contents = req.body.contents;
    detail.detailDate = new Date();
    for (var i = 0; i < 3; i++) {
        detail.pictureName[i] = img1.name;
    }
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
    img1.mv('/Temp/' + img1.name, function (err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });

    /*
     img2.mv('/Temp/' + img2.name, function (err) {
     if (err) {
     res.status(500).send(err);
     }
     else {
     res.send('File uploaded!');
     }
     });
     img3.mv('/Temp/' + img3.name, function (err) {
     if (err) {
     res.status(500).send(err);
     }
     else {
     res.send('File uploaded!');
     }
     });
     */
});


module.exports = router;
