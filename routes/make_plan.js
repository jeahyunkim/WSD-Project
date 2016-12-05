var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/travel', function(req, res, next) {
  res.render('travel_plan', { title: 'Express' });
});

module.exports = router;
