var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/detail_register', function(req, res, next) {
  res.render('detail_register', { title: 'Express' });
});

module.exports = router;
