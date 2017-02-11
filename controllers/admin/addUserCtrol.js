/**
 * Created by winty on 2017/1/12.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');
var formidable = require('formidable');
var fs = require('fs');
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
  var form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
      console.log('-----fields',fields )
      User.findOne({userName: fields.userName}, function (error, person) {
          if (error) {
              res.json({status: 0, mes: '增加用户失败！'});
          } else if (person) {
              res.json({status: 0, mes: '该用户已存在！'});
          } else {
              User.create({
                  userName: fields.userName,
                  password: fields.password,
                  power: fields.power,
                  wechat: fields.wechat,
                  phone: fields.phone
              }, function (error, User) {
                  console.log('---------',User)
                  if (error) {
                      res.json({status: '0', mes: '增加用户失败！'});
                  } else {
                      res.json({status: '1', mes: '增加用户成功！'});
                  }
              })
          }
      })
      // if (files) {
      //     req.session.portrait = files;
      // } else if (fields) {
      //     var fileId = new mongo.ObjectId();
      //     var writeStream = gfs.createWriteStream({
      //         _id: fileId,
      //         filename: req.session.portrait.name,
      //         mode: 'w',
      //         content_type: mimetype
      //     });
      //     file.pipe(writeStream);
  //     }
  });
};