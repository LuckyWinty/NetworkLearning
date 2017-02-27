/**
 * Created by winty on 2017/1/12.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');
var formidable = require('formidable');
var Link = mongoose.model('Link');
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
    //console.log('---------------看看user',req.session.user);
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
        console.log('-----files',files )
         if (files) {
             var fileId = new mongo.ObjectId();
             var writeStream = gfs.createWriteStream({
                 _id: fileId,
                 filename: files.name,
                 mode: 'w',
                 content_type: files.type
             });
             fs.createReadStream(files.file.path).pipe(writeStream);
             //files.file.path.pipe(writeStream);
             writeStream.on('close', function(file) {
                 fs.unlink(files.file.path, function(err) {
                     if (err) {
                         res.json({status: 0, fileId: fileId, mes: '上传图片失败！'});
                     };
                     res.json({status: 1, fileId: fileId, mes: '上传图片成功！'});
                 });
             });

         }
    })
};
module.exports.addSubjectInfo = function(req, res){
    if(req.body.subject){
      var practices = analysisLink(req.body.subject.practice);
      var moreInfos = analysisLink(req.body.subject.moreInfo);
        Subject.create({
            title: req.body.subject.title,
            imageId: req.body.subject.imageId,
            desc: req.body.subject.desc,
            level: req.body.subject.level,
            learnTime: req.body.subject.learnTime,
            practices: practices,
            moreInfos: moreInfos,
            content: req.body.subject.content,
            mustKnow: req.body.subject.mustKnow
        }, function (error, Subject) {
            // console.log('---------',Subject)
            if (error) {
                console.log('-----------error',error)
                res.json({status: 0, mes: '录入课程失败！'});
            } else {
                res.json({status: 1, mes: '录入课程成功！'});
            }
        })
    }
    function analysisLink(str){
        var arr = [];
        var strs = str.split(',');

        var i = 0;
        while (i < strs.length) {
            var practice = new Link;
            practice.name = strs[i].split('|')[0];
            practice.url = strs[i].split('|')[1]?strs[i].split('|')[1]:'';
            arr.push(practice);
            i++;
        }
        return arr;
    }
};
