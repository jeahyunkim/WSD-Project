var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/travel', function(req, res, next) {
  res.render('travel_plan', { title: 'Express' });
});

router.get('/travel/detail', function(req, res, next) {
  res.render('travel_plan_detail', { title: 'Express' });
});

module.exports = router;
