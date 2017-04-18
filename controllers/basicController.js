/**
 * Created by winty on 2017/3/11.
 */

var mongoose = require('mongoose');
require('../model/model');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');
var Comment = mongoose.model('Comment');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var Link = mongoose.model('Link');


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
                        if(Subject.beFocused.indexOf(userId) == -1) {
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
                                                    res.json({status: 1, isFocus: 1, num:sub.beFocused.length,mes: '关注成功'});
                                                }
                                            })
                                        })
                                }
                            })
                        }else{
                            res.json({status: 1, isFocus: 1, num:Subject.beFocused.length,mes: '关注成功'});
                        }
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
module.exports.comment = function(req, res){
    if(req.body.subjectId && req.body.userId){
        var SubjectId = req.body.subjectId;
        var userId = req.body.userId;
            Subject.findById({'_id': SubjectId})
                .exec(function (error, Subject1) {
                    if (error) {
                        res.json({status: 0, mes: '评论失败'});
                    } else {
                        var com = new Comment;
                        com.content = req.body.comment;
                        com.user = userId;
                        Subject1.comments.push(com);
                        Subject1.save(function (err, sub) {
                            if (err) {
                                res.json({status: 0, mes: '评论失败'});
                            } else {
                                User.findOne({_id: userId})
                                    .exec(function (err, person) {
                                        person.myComments.subjects.push(sub);
                                        person.save(function (err, user) {
                                            if (err) {
                                                res.json({status: 0, mes: '评论失败'});
                                            } else {
                                                Subject.findById({'_id': SubjectId})
                                                    .populate('comments.user')
                                                    .exec(function(error,Subject2){
                                                        if(error){
                                                            res.json({status: 0, mes: '评论失败'});
                                                        }else{
                                                            res.json({status: 1, comments: Subject2.comments, mes: '评论成功'});
                                                        }
                                                    })
                                            }
                                        })
                                    })
                            }
                        })
                    }
                })
        } else{
        res.json({status: 0, mes: '失败'});
    }
}
module.exports.ask = function(req, res){
if(req.body.subjectId && req.body.userId){
var SubjectId = req.body.subjectId;
var userId = req.body.userId;
Subject.findById({'_id': SubjectId})
.exec(function (error, Subject1) {
if (error) {
res.json({status: 0, mes: '提问失败'});
} else {
var com = new Question;
com.content = req.body.question;
com.user = userId;
Subject1.Questions.push(com);
Subject1.save(function (err, sub) {
if (err) {
res.json({status: 0, mes: '提问失败'});
} else {
User.findOne({_id: userId})
.exec(function (err, person) {
    person.myQuestions.questions.push(com);
    person.save(function (err, user) {
        if (err) {
            res.json({status: 0, mes: '提问失败'});
        } else {
            Subject.findById({'_id': SubjectId})
                .populate('Questions.user')
                .exec(function(error,Subject2){
                    if(error){
                        res.json({status: 0, mes: '提问失败'});
                    }else{
                        res.json({status: 1, questions: Subject2.Questions, mes: '提问成功'});
                    }
                })
        }
    })
})
}
})
}
})
} else{
res.json({status: 0, mes: '失败'});
}
}
module.exports.reply = function(req, res){
if(req.body.subjectId && req.body.userId && req.body.questionId){
var SubjectId = req.body.subjectId;
var userId = req.body.userId;
var questionId = req.body.questionId;
Subject.findById({'_id': SubjectId})
.exec(function (error, Subject1) {
    if (error) {
        res.json({status: 0, mes: '回复失败'});
    } else {
        var com = new Answer;
        com.content = req.body.reply;
        com.user = userId;
        for(var i = 0; i < Subject1.Questions.length; i++){
            if(Subject1.Questions[i]._id.toString() == questionId){
                Subject1.Questions[i].answers.push(com);
                break;
            }
        }
        Subject1.save(function (err, sub) {
            if (err) {
                res.json({status: 0, mes: '回复失败'});
            } else {
                Subject.findById({'_id': SubjectId})
                    .populate('Questions.user')
                    .populate('Questions.answers.user')
                    .exec(function(error,Subject2){
                        if(error){
                            res.json({status: 0, mes: '回复失败'});
                        }else{
                            res.json({status: 1, questions: Subject2.Questions, mes: '回复成功'});
                        }
                    })
            }
        })
    }
})
}else if(req.body.userId && req.body.questionId){
var userId = req.body.userId;
var questionId = req.body.questionId;
Question.findById({'_id': questionId})
.exec(function (error, ques) {
    if (error) {
        res.json({status: 0, mes: '回答失败'});
    } else {
        var com = new Answer;
        com.content = req.body.reply;
        com.user = userId;
        ques.answers.push(com);
        ques.save(function (err, ques1) {
            if (err) {
                res.json({status: 0, mes: '回答失败'});
            } else {
                Question.find({})
                    .populate('user')
                    .populate('answers.user')
                    .sort({'created':-1})
                    .exec(function (error, ques2) {
                        if (error) {
                            res.json({status: 0, mes: '回复失败'});
                        } else {
                            res.json({status: 1, questions: ques2, mes: '回复成功'});
                        }
                })
            }
        })
    }
})
}
else{
res.json({status: 0, mes: '失败'});
}
}
module.exports.doLike = function(req, res){
    var likeFlag = true;  //默认是点赞
    var linkNum = 0;
    if(req.body.userId){
        User.findOne({id: userId}, function (error, person) {
            if (error) {
                res.json({status: 0, mes: '失败！'});
            } else if (person) {
                for(var i = 0; i < person.myLikes.answers.length; i++){
                    if(person.myLikes.answers[i].toString() == answerId.toString()){
                        likeFlag = false;
                        person.myLikes.answers.splice(i,1);
                        break;
                    }
                }
                if(likeFlag){
                    person.myLikes.answers.push(answerId)
                }
                person.save(function (err, ques1) {
                    if (err) {
                        res.json({status: 0, mes: '点赞失败'});
                        return;
                    }
                })
            }else{
                res.json({status: 0, mes:'该账户不存在，请注册'});
            }
        });
    }
    if(req.body.subjectId && req.body.questionId){
        var SubjectId = req.body.subjectId;
        var userId = req.body.userId;
        var questionId = req.body.questionId;
        Subject.findById({'_id': SubjectId})
            .exec(function (error, Subject1) {
                if (error) {
                    res.json({status: 0, mes: '点赞失败'});
                } else {
                    for(var i = 0; i < Subject1.Questions.length; i++){
                        if(Subject1.Questions[i]._id.toString() == questionId){
                            for(var j = 0 ;j < Subject1.Questions[i].answers.length;j++){
                                var ans = Subject1.Questions[i].answers[j];
                                if(ans._id.toString() == req.body.answerId.toString()){
                                    if(likeFlag){
                                        ans.likeNum++;
                                    }else{
                                        ans.likeNum--;
                                    }
                                    linkNum = ans.likeNum;
                                    break;
                                }
                            }
                        }
                    }
                    Subject1.save(function (err, sub) {
                        if (err) {
                            res.json({status: 0, mes: '点赞失败'});
                        } else {
                            res.json({status: 1, likeNum: linkNum, mes: '成功'});
                        }
                    })
                }
            })
    }else if(req.body.userId && req.body.questionId){
        var answerId = req.body.answerId
        var questionId = req.body.questionId;
        Question.findById({'_id': questionId})
            .exec(function (error, ques) {
                if (error) {
                    res.json({status: 0, mes: '点赞失败'});
                } else {
                    for(var j = 0 ;j < ques.answers.length;j++) {
                        var ans = ques.answers[j];
                        if (ans._id.toString() == answerId.toString()) {
                            if (likeFlag) {
                                ans.likeNum++;
                            } else {
                                ans.likeNum--;
                            }
                            linkNum = ans.likeNum;
                            break;
                        }
                    }
                    ques.save(function (err, ques1) {
                        if (err) {
                            res.json({status: 0, mes: '点赞失败'});
                        } else {
                            res.json({status: 1, likeNum: linkNum, mes: '成功'});
                        }
                    })
                }
            })
    } else{
        res.json({status: 0, mes: '失败'});
    }
}
module.exports.focusQuestion = function(req, res){
    if(req.body.questionId && req.body.userId){
        var questionId = req.body.questionId;
        var userId = req.body.userId;
        if (req.body.isFocus == 0) {
            Question.findById({'_id': questionId})
                .exec(function (error, question) {
                    if (error) {
                        res.json({status: 0, mes: '关注失败'});
                    } else {
                        question.beFocused.push(userId);
                        question.save(function (err, sub) {
                            if (err) {
                                res.json({status: 0, mes: '关注失败'});
                            } else {
                                User.findOne({_id: userId})
                                    .exec(function (err, person) {
                                        person.myFocusQuestions.questions.push(sub);
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
            Question.findById({'_id': questionId})
                .exec(function (error, question) {
                    if (error) {
                        res.json({status: 0, mes: '取关失败'});
                    } else {
                        var index = question.beFocused.indexOf(userId);
                        if(index > -1){
                            question.beFocused.splice(index,1);
                        }else{
                            res.json({status: 0, mes: '取关失败'});
                            return;
                        }
                        question.save(function (err, sub) {
                            if (err) {
                                res.json({status: 0, mes: '取关失败'});
                            } else {
                                User.findOne({_id: userId})
                                    .exec(function (err, person) {
                                        for (var i = 0; i < person.myFocusQuestions.questions.length; i++) {
                                            if (person.myFocusQuestions.questions[i]._id.toString() == sub._id.toString()) {
                                                person.myFocusQuestions.questions.splice(i, 1);
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
module.exports.checkLogin = function(req, res){
    if( req.body.userId){
        var userId = req.body.userId;
        User.findOne({_id: userId})
            .exec(function (err, person) {
                if (err) {
                    res.json({status: 0, mes: '失败'});
                } else {
                    res.json({status: 1, person: person, mes: '查找成功'});
                }
            })
    }else {
        res.json({status: 0, mes: '失败'});
    }
}
module.exports.updatePersonInfo = function(req, res){
    if(req.body.userId){
        User.findOne({_id:req.body.userId})
            .exec(function(error,user){
                if(error){
                    console.log('.....查找用户出错',error);
                }else{
                    user.portrait = req.body.user.portrait;
                    user.wechat = req.body.user.wechat;
                    user.qq = req.body.user.qq;
                    user.phone = req.body.user.phone;
                    user.signature = req.body.user.signature;
                    user.save(function (err, ques1) {
                        if (err) {
                            res.json({status: 0, mes: '修改失败!'});
                        }else{
                            res.json({status: 0, mes: '修改成功!'});
                        }
                    })
                }
            })
    }else{
        res.json({status: 0,mes:'查找用户失败！'});
    }
}