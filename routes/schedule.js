/**
 * Created by jinho on 2016-11-21.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/register', function(req, res, next) {
    // DB 추가
    res.render('schedule_register', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
    // DB 추가
    res.redirect('/schedule/list');
});

router.get('/list', function(req, res, next){
    res.render('schedule_list', { title: 'Express' });
});


module.exports = router;
