var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');

/* Get Models */
var schedule_detail = require('../models/schedule_detail.js');
var schedule = require('../models/schedule.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('timeline', { title: 'Express' });
});

module.exports = router;
