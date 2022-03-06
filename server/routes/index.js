var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: "Mock Dev Server", textValue: 'Custom Express' });
});

module.exports = router;
