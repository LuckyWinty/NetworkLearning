var express = require('express');
var router = express.Router();
var registController = require("../controllers/registController");
var loginController = require("../controllers/loginController");
//admin
var addUserCtrol = require("../controllers/admin/addUserCtrol");

var fs = require('fs');
var mongoose = require("mongoose");
var Grid = require('gridfs-stream');
var GridFS = Grid(mongoose.connection.db, mongoose.mongo);


/* GET home page. */
router.get('/', function(req, res, next) {
//  try {
////read from mongodb
//    GridFS.files.find({ filename: 'essayPic' }).toArray(function (err, files) {
//      if (err) {
//        throw (err);
//      }
//      console.log(files);
//    });
//  } catch (err) {
//    console.log('444');
//  }
  res.json({test:'asdfas'});
});

router.post('admin/add',function(req,res){
  addUserCtrol.doAdd(req,res);
})
router.post("/user/regist", registController.regist);
router.post("/user/login", loginController.login);



module.exports = router;
