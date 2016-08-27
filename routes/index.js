var express = require('express');
var router = express.Router();
var registController = require("../controllers/registController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/user/regist", registController.regist);



module.exports = router;
