var express = require('express');
var router = express.Router();


/* GET overview page. */
router.get('/', function(req, res, next) {
  res.render('overview', { title: 'Översikt'});
});
/* GET courses page. */
router.get('/courses', function(req, res, next) {
  res.render('courses', { title: 'Kurser'});
});

/* GET news page. */
router.get('/news', function(req, res, next) {
  res.render('news', { title: 'Nyheter'});
});

/* GET schedule page. */
router.get('/schedule', function(req, res, next) {
  res.render('schedule', { title: 'Schema'});
});
module.exports = router;
