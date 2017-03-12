/**
 * Created by winty on 2017/3/11.
 */

var mongoose = require('mongoose');
require('../model/model');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');

module.exports.focusSubject = function(req, res){
    if(req.body.subjectId && req.body.userId){
        var SubjectId = req.body.subjectId;
        var userId = req.body.userId;
        if (req.body.isFocus == 0) {
            Subject.findById({'_id': SubjectId})
                .exec(function (error, Subject) {
                    if (error) {
                        res.json({status: 0, mes: '关注失败'});
                    } else {
                        Subject.beFocused.push(userId);
                        Subject.save(function (err, sub) {
                            if (err) {
                                res.json({status: 0, mes: '关注失败'});
                            } else {
                                User.findOne({_id: userId})
                                    .exec(function (err, person) {
                                        person.mySubjects.subjects.push(sub);
                                        person.save(function (err, user) {
                                            if (err) {
                                                res.json({status: 0, mes: '关注失败'});
                                            } else {
                                                res.json({status: 1, isFocus: 1, mes: '关注成功'});
                                            }
                                        })
                                    })
                            }
                        })
                    }
                })
        } else {
            Subject.findById({'_id': SubjectId})
                .exec(function (error, Subject) {
                    if (error) {
                        res.json({status: 0, mes: '取关失败'});
                    } else {
                        var index = Subject.beFocused.indexOf(userId);
                        if(index > -1){
                            Subject.beFocused.splice(index,1);
                        }else{
                            res.json({status: 0, mes: '取关失败'});
                            return;
                        }
                        Subject.save(function (err, sub) {
                            if (err) {
                                res.json({status: 0, mes: '取关失败'});
                            } else {
                                User.findOne({_id: userId})
                                    .exec(function (err, person) {
                                        for (var i = 0; i < person.mySubjects.subjects.length; i++) {
                                            if (person.mySubjects.subjects[i]._id.toString() == sub._id.toString()) {
                                                person.mySubjects.subjects.splice(i, 1);
                                                break;
                                            }
                                        }
                                        person.save(function (err, use) {
                                            if (err) {
                                                res.json({status: 0, mes: '取关失败'});
                                            } else {
                                                res.json({status: 1,isFocus:0, mes: '取关成功'});
                                            }
                                        })
                                    })
                            }
                        })
                    }
                })
        }
    }else{
        res.json({status: 0, mes: '失败'});
    }
}



