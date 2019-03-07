var express = require('express');
var router = express.Router();


/* GET overview page. */
router.get('/', function(req, res, next) {
  res.render('overview', { title: 'Ludum - Översikt', pageTitle: 'Översikt'});
});
/* GET overview2 page. */
router.get('/overview2', function(req, res, next) {
  res.render('overview2', { title: 'Ludum - Översikt', pageTitle: 'Översikt'});
});
/* GET courses page. */
router.get('/courses', function(req, res, next) {
  res.render('courses', { title: 'Ludum - Kurser', pageTitle: 'Kurser'});
});
/* GET news page. */
router.get('/news', function(req, res, next) {
  res.render('news', { title: 'Ludum - Nyheter', pageTitle: 'Nyheter'});
});
/* GET schedule page. */
router.get('/schedule', function(req, res, next) {
  res.render('schedule', { title: 'Ludum - Schema', pageTitle: 'Schema'});
});
/* GET tasks page. */
router.get('/tasks', function(req, res, next) {
  res.render('tasks', { title: 'Ludum - Uppgifter', pageTitle: 'Uppgifter'});
});
/* GET messages page. */
router.get('/messages', function(req, res, next) {
  res.render('messages', { title: 'Ludum - Meddelanden', pageTitle: 'Meddelanden'});
});
/* GET employees page. */
router.get('/employees', function(req, res, next) {
  res.render('employees', { title: 'Ludum - Personal', pageTitle: 'Personal'});
})
/* GET Student page. */
router.get('/students', function(req, res, next) {
  res.render('students', { title: 'Ludum - Elevgrupper', pageTitle: 'Elevgrupper'});
})
/* GET course page. */
router.get('/course', function(req, res, next) {
  res.render('course', { title: 'Ludum - Kurs'});
})
module.exports = router;
