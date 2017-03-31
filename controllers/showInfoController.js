/**
 * Created by winty on 2017/2/23.
 */

var mongoose = require('mongoose');
require('../model/model');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');
var Question = mongoose.model('Question');
var Item=mongoose.model('Item');
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
        .populate('comments.user')
        .populate('Questions.user')
        .populate('Questions.answers.user')
        .sort({'created':-1})
        .exec(function(error,Subjects){
            if(error){
                console.log('.....查找所有课程出错',error);
            }else{
                console.log('.....deng',req.body.userId);
                if(req.body.userId){
                    User.findOne({_id: req.body.userId})
                        .exec(function (err, person) {
                            for (var i = 0; i < person.mySubjects.subjects.length; i++) {
                                for (var j = 0; j < Subjects.length; j++) {
                                    if (person.mySubjects.subjects[i]._id.toString() == Subjects[j]._id.toString()) {
                                        Subjects[j].isFocus = 1;
                                        break;
                                    }
                                }
                            }
                            res.json({status: 1,Subjects:Subjects, mes: '查找所有课程成功！'});
                    })
                }else{
                    res.json({status: 1,Subjects:Subjects, mes: '查找所有课程成功！'});
                }
            }
        })
}
module.exports.showOneSubject = function(req, res){
    if(req.body.subjectId){
        Subject.findOne({'_id': req.body.subjectId})
            .populate('comments.user')
            .populate('Questions.user')
            .populate('Questions.answers.user')
            .exec(function(error,Subject){
                if(error){
                    console.log('.....查找课程出错',error);
                }else{
                    console.log('------------------',Subject)
                    res.json({status: 1,Subject:Subject, mes: '查找所有课程成功！'});
                }
            })
    }else{
        res.json({status: 0,mes: '找不到课程信息！'});
    }
}
module.exports.showQuestions = function(req, res){
    Question.find({})
        .populate('user')
        .populate('answers.user')
        .sort({'created':-1})
        .exec(function(error,Questions){
            if(error){
                console.log('.....查找所有问题出错',error);
            }else{
                console.log('.....查找----',Questions);
                if(req.body.userId){
                    User.findOne({_id: req.body.userId})
                        .exec(function (err, person) {
                            for (var i = 0; i < person.myFocusQuestions.questions.length; i++) {
                                for (var j = 0; j < Questions.length; j++) {
                                    if (person.myFocusQuestions.questions[i]._id.toString() == Questions[j]._id.toString()) {
                                        Questions[j].isFocus = 1;
                                        break;
                                    }
                                }
                            }
                            res.json({status: 1,Questions:Questions, mes: '查找所有课程成功！'});
                        })
                }else{
                    res.json({status: 1,Questions:Questions, mes: '查找所有课程成功！'});
                }
            }
        })
}
module.exports.goodPerson = function(req, res){
    User.find({})
        .sort({'created':-1})
        .exec(function(error,users){
            if(error){
                console.log('.....查找所有用户出错',error);
            }else{
               askPersons = users.sort(function(a,b){
                   return b.myQuestions.questions.length - a.myQuestions.questions.length
               }).slice(0,5)
               answerPersons = users.sort(function(a,b){
                    return b.myAnswers.answers.length - a.myAnswers.answers.length
                }).slice(0,5)
            res.json({status: 1,askPersons:askPersons,answerPersons:answerPersons, mes: '查找所有课程成功！'});
            }
        })
}
module.exports.showPractice = function(req, res){
    if(req.body.belong){
        Item.find({belong:req.body.belong})
            .exec(function(error,Items) {
                if (error) {
                    res.json({status: 0,mes:'查找失败'});
                } else {
                    res.json({status: 1,mes:'查找成功',Items: Items});
                }
            })
    }else{
        res.json({status: 0,mes:'暂无题目'});
    }
}
module.exports.showPersonInfo = function(req, res){
    if(req.body.userId){
        User.findOne({_id:req.body.userId})
            .populate('myQuestions.questions.user')
            .populate('myQuestions.questions.answers.user')
            .populate('myFocusQuestions.questions.user')
            .populate('myFocusQuestions.questions.answers.user')
            .exec(function(error,user){
                if(error){
                    console.log('.....查找用户出错',error);
                }else{
                    res.json({status: 1,user:user, mes: '查找用户成功！'});
                }
            })
    }else{
        res.json({status: 0,mes:'查找用户失败！'});
    }
}

module.exports.showSingleQuestion = function(req, res){
    if(req.body.questionId){
        console.log('.....查找出错',req.body.questionId);
        Question.findOne({_id:req.body.questionId})
            .populate('user')
            .populate('answers.user')
            .exec(function(error,Question){
                if(error){
                    console.log('.....查找出错',error);
                }else{
                    res.json({status: 1,Question:Question, mes: '查找成功！'});
                }
            })
    }else{
        res.json({status: 0,mes:'查找失败！'});
    }
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