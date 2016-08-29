var express = require('express');
var router = express.Router();
var registController = require("../controllers/registController");
var loginController = require("../controllers/loginController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/regist', function (req, res, next) {
  res.render("regist");
});
router.get('/login', function (req, res, next) {
  res.render("login");
});

router.post("/user/regist", registController.regist);
router.post("/user/login", loginController.login);



module.exports = router;
