var express = require('express');
var router = express.Router();


/* GET overview page. */
router.get('/', function(req, res, next) {
  res.render('overview', { title: 'Ludum - Översikt'});
});
/* GET courses page. */
router.get('/courses', function(req, res, next) {
  res.render('courses', { title: 'Ludum - Kurser'});
});

/* GET news page. */
router.get('/news', function(req, res, next) {
  res.render('news', { title: 'Ludum - Nyheter'});
});

/* GET schedule page. */
router.get('/schedule', function(req, res, next) {
  res.render('schedule', { title: 'Ludum - Schema'});
});

/* GET employees page. */
router.get('/employees', function(req, res, next) {
  res.render('employees', { title: 'Ludum - Personal'});
})
/* GET Student page. */
router.get('/students', function(req, res, next) {
  res.render('students', { title: 'Ludum - Elevgrupper'});
})
module.exports = router;
