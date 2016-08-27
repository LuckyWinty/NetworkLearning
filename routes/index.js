var express = require('express');
var router = express.Router();
var registController = require("../controllers/registController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/regist', function (req, res, next) {
  res.render("regist");
});

router.post("/user/regist", registController.regist);



module.exports = router;
