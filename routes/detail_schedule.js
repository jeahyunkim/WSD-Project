/**
 * Created by lrmuc on 2016-12-05.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Mongo = require('mongodb');

var scheduleSchema = mongoose.Schema({
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

var Schedule = mongoose.model('schedule1',scheduleSchema);




var detailSchema = mongoose.Schema({
    scheduleID: String,
    title: String,
    contents: String,
    detailDate: Date,
    commentID: [String],
    pictureName: [String]
});
var Detail = mongoose.model('detail1', detailSchema);


var commentSchema = mongoose.Schema({
    user_id : String,
    detail_id : String,
    day : Date,
    content : String
})

var Comment = mongoose.model('comment',commentSchema);

router.get('/', function(req, res, next) {
    var author;
    var detail = new Detail();
    var comment = new Comment();

    Detail.findOne({_id : Mongo.ObjectID("58446108600e00cb0cf48333")}, function(err,docs){//req.params.detail_id
        if(err) return console.log("detail err");
        if(!docs) return console.log("detail not find");
        detail = docs;
        Schedule.findOne({_id : Mongo.ObjectID(docs.scheduleID)},function(err,docs2){
            if(err) return console.log("schedule err");;
            if(!docs2) return console.log("schedule not find");
            author = docs2.author;
            Comment.find({detail_id : Mongo.ObjectID("58446108600e00cb0cf48333")},function(err,docs3){//req.params.detail_id
                if(err) return console.log("comment err");
                if(!docs3) return console.log("comment not find");
                comment = docs3;
                res.render('travel_plan_detail',{title: 'Express',
                    author : author,
                    detail : detail,
                    comment : comment
                })
            });
        })
    })
})



router.post('/comment/insert',function(req,res,next){
    var comment = new Comment({
        'user_id' : req.cookies.id,
        'content' : req.body.comment,
        'detail_id' : req.body.detail_id,
        'day' : new Date()
    })
    comment.save(function(err,silence){
        if(err){
            console.log(err);
            res.status(500).send('update error');
            return;
        }
        res.redirect('/schedule/detail');
    });
})

module.exports = router;