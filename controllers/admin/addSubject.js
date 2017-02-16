/**
 * Created by winty on 2017/1/12.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');
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

module.exports.addSubject = function(req, res){
    console.log('---------------看看',req.body.subject);
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
        console.log('-----files',files )
         if (files) {
             req.session.portrait = files;
             res.json({status: 1, mes: '上传图片成功！'});
         } else if (fields) {
             var fileId = new mongo.ObjectId();
             var writeStream = gfs.createWriteStream({
                 _id: fileId,
                 filename: req.session.portrait.name,
                 mode: 'w',
                 content_type: mimetype
             });
             file.pipe(writeStream);
         }
    });
    if(req.body.subject){
        Subject.create({
            title: req.body.subject.title,
            images: req.session.portrait.name,
            desc: req.body.subject.desc,
            level: req.body.subject.level,
            learnTime: req.body.subject.learnTime,
            practice: req.body.subject.practice.split(','),
            moreInfo: req.body.subject.moreInfo.split(','),
            content: req.body.subject.content,
            mustKnow: req.body.subject.mustKnow
        }, function (error, Subject) {
            console.log('---------',Subject)
            if (error) {
                res.json({status: '0', mes: '录入课程失败！'});
            } else {
                res.json({status: '1', mes: '录入课程成功！'});
            }
        })
        res.json({status: 1, mes: '录入课程成功！'});
    }
};
module.exports.addSubjectInfo = function(req, res){
    console.log('---------------看看',req.body.subject);
    if(req.body.subject){
        Subject.create({
            title: req.body.subject.title,
            images: req.session.portrait.name,
            desc: req.body.subject.desc,
            level: req.body.subject.level,
            learnTime: req.body.subject.learnTime,
            practice: req.body.subject.practice.split(','),
            moreInfo: req.body.subject.moreInfo.split(','),
            content: req.body.subject.content,
            mustKnow: req.body.subject.mustKnow
        }, function (error, Subject) {
            console.log('---------',Subject)
            if (error) {
                res.json({status: '0', mes: '录入课程失败！'});
            } else {
                res.json({status: '1', mes: '录入课程成功！'});
            }
        })
        res.json({status: 1, mes: '录入课程成功！'});
    }
};