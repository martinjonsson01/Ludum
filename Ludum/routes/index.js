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
module.exports = router;
