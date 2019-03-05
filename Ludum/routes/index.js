var express = require('express');
var router = express.Router();

/* GET overview page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Översikt', profileImage: 'https://cdn.discordapp.com/attachments/404992639948161029/539762969731530754/IMG_5088.JPG'});
});

module.exports = router;
