var express = require('express');
var router = express.Router();
var registController = require("../controllers/registController");
var loginController = require("../controllers/loginController");
var showInfoController = require("../controllers/showInfoController");
var basicController = require("../controllers/basicController");
var forturnController = require("../controllers/forturnController");

//admin
var addUserCtrol = require("../controllers/admin/addUserCtrol");
var addSubjectCtrol = require("../controllers/admin/addSubject");
var addPracticeCtrol = require("../controllers/admin/addPractice");
var showInfoCtrol = require("../controllers/admin/showInfo");
var basicCtrol = require("../controllers/admin/basicCtrol");

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
router.post('/admin/addImage',function(req,res){
  addSubjectCtrol.addImage(req,res);
})
router.post('/admin/addSubjectInfo',function(req,res){
  addSubjectCtrol.addSubjectInfo(req,res);
})
router.post('/admin/addPractice',function(req,res){
    addPracticeCtrol.addPractice(req,res);
})
router.post('/admin/showUsers',function(req,res){
  showInfoCtrol.showUsers(req,res);
})
router.post('/admin/showSubjects',function(req,res){
  showInfoCtrol.showSubjects(req,res);
})
router.post('/admin/resetPassword',function(req,res){
  basicCtrol.resetPassword(req,res);
})
router.post('/admin/deletUser',function(req,res){
  basicCtrol.deletUser(req,res);
})
router.post('/admin/DeleteSubject',function(req,res){
  basicCtrol.DeleteSubject(req,res);
})
router.post('/admin/updateSubject',function(req,res){
  basicCtrol.updateSubject(req,res);
})
router.post('/admin/showQuestions',function(req,res){
  showInfoCtrol.showQuestions(req,res);
})
router.post('/admin/deleteQuestion',function(req,res){
  basicCtrol.deleteQuestion(req,res);
})
router.post('/admin/showItems',function(req,res){
  showInfoCtrol.showItems(req,res);
})
router.post('/admin/showOneItem',function(req,res){
  showInfoCtrol.showOneItem(req,res);
})
router.post('/admin/updateItem',function(req,res){
  basicCtrol.updateItem(req,res);
})
router.post('/admin/deleteItem',function(req,res){
  basicCtrol.deleteItem(req,res);
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
router.post("/checkLogin",basicController.checkLogin);
router.post("/showPractice",showInfoController.showPractice);
router.post("/showPersonInfo",showInfoController.showPersonInfo);
router.post("/updatePersonInfo",basicController.updatePersonInfo);

router.post("/showSingleQuestion",showInfoController.showSingleQuestion);
//论坛
router.post("/showQuestions",showInfoController.showQuestions);
router.post("/getPerson",showInfoController.goodPerson);
router.post("/askQuestion",forturnController.askQuestion);
router.post("/doLike",basicController.doLike);
router.post("/focusQuestion",basicController.focusQuestion);

//加载图片
router.get('/image', function (req, res) {
  console.log('----------------------来了')
  showInfoController.getImage(req, res);
});


module.exports = router;
