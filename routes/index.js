var express = require('express');
var router = express.Router();
var registController = require("../controllers/registController");
var loginController = require("../controllers/loginController");
var showInfoController = require("../controllers/showInfoController");
var basicController = require("../controllers/basicController");
//admin
var addUserCtrol = require("../controllers/admin/addUserCtrol");
var addSubjectCtrol = require("../controllers/admin/addSubject")

var fs = require('fs');
var mongoose = require("mongoose");
var Grid = require('gridfs-stream');
var GridFS = Grid(mongoose.connection.db, mongoose.mongo);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({test:'asdfas'});
});

router.post('/admin/add',function(req,res){
  addUserCtrol.doAdd(req,res);
})
router.post('/admin/addSubject',function(req,res){
  addSubjectCtrol.addSubject(req,res);
})
router.post('/admin/addSubjectInfo',function(req,res){
  addSubjectCtrol.addSubjectInfo(req,res);
})

//用户
router.post("/user/regist", registController.regist);
router.post("/login", loginController.doLogin);
router.post("/index",showInfoController.showSubjects);
router.post("/subjectSpots",showInfoController.showOneSubject);
router.post("/focus",basicController.focusSubject);
router.post("/comment",basicController.comment);
router.post("/ask",basicController.ask);
router.post("/reply",basicController.reply);

//加载图片
router.get('/image', function (req, res) {
  console.log('----------------------来了')
  showInfoController.getImage(req, res);
});


module.exports = router;
