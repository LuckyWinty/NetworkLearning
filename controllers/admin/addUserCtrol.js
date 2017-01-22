/**
 * Created by winty on 2017/1/12.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');
var fs = require('fs');
var Busboy = require('busboy');
var mongo = require('mongodb');
var Grid = require('gridfs-stream');
var db = new mongo.Db('networkLearning', new mongo.Server("127.0.0.1", 27017), {safe: false});
var gfs;
var util = require('util');
var moment=require('moment');

db.open(function (err) {
  if (err) {
    throw err;
  }
  gfs = Grid(db, mongo);
});

module.exports.doAdd = function(req, res){
  var busboy = new Busboy({headers: req.headers});
  var fileId = new mongo.ObjectId();
  var body = {};

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('got file', filename, mimetype, encoding);
    var writeStream = gfs.createWriteStream({
      _id: fileId,
      filename: filename,
      mode: 'w',
      content_type: mimetype
    });
    file.pipe(writeStream);
  }).on('finish', function () {
    //if(body.personInfo) {
      console.log('user info',body.personInfo);
    //  User.findOne({userName:body.personInfo.userName},function(error,person){
    //    if(error){
    //      res.json({status:'0',mes:'增加用户失败！'});
    //    }else if(person){
    //      res.json({status:'1',mes:'该用户已存在！'});
    //    }else{
    //      User.create({
    //        portrait:fileId,
    //        userName:body.personInfo.userName
    //      },function(error,User){
    //        if(error){
    //          res.json({status:'0',mes:'增加用户失败！'});
    //        }else{
    //          res.json({status:'1',mes:'增加用户成功！'});
    //        }
    //      })
    //    }
    //  })
      res.json({status:'1',mes:'增加用户成功！'})
    //}
  });
  req.pipe(busboy);
};