/**
 * Created by winty on 2017/2/23.
 */

var mongoose = require('mongoose');
require('../model/model');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');
var mongo = require('mongodb');
var util = require('util');
var moment=require('moment');
var Grid = require('gridfs-stream');
var db = new mongo.Db('networkLearning', new mongo.Server("127.0.0.1", 27017), {safe: false});
var gfs;
db.open(function (err) {
    if (err) {
        throw err;
    }
    gfs = Grid(db, mongo);
});

module.exports.showSubjects = function(req, res){
    Subject.find({})
        .sort({'created':-1})
        .exec(function(error,Subjects){
            if(error){
                console.log('.....查找所有课程出错',error);
            }else{
                res.json({status: 1,Subjects:Subjects, mes: '查找所有课程成功！'});
            }
        })
}

module.exports.getImage = function(req, res){
    var _id = new mongo.ObjectId(req.query.imageId);
    console.log("_id--------------------" , _id);
    gfs.files.findOne({'_id': _id}, function (err, file) {
        // console.log("pic--------------------" , file);
        if (err) return res.status(400).send(err);
        if (!file) return res.status(404).send('');
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', 'attachment; filename=""');
        var readstream = gfs.createReadStream({
            _id: file._id
        });
        readstream.on("error", function(err) {
            console.log("Got error while processing stream " + err.message);
            res.end();
        });
        readstream.pipe(res);
    });
}