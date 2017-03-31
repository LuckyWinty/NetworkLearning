/**
 * Created by winty on 2017/3/17.
 */
var mongoose = require('mongoose');
require('../model/model');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');
var Comment = mongoose.model('Comment');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports.askQuestion = function(req, res){
    if(req.body.userId){
        Question.create({
            user:req.body.userId,
            content:req.body.content
        },function(error1,question){
            Question.find({_id:question._id})
                .populate('user')
                .populate('answers.user')
                .exec(function(error2,question1){
                    if(error2){
                        res.json({status: 0, mes: '提问失败'});
                    }else{
                        User.findOne({_id:req.body.userId})
                            .exec(function(error3,user5){
                                if(error3){
                                    console.log('.....查找用户出错',error3);
                                }else{
                                    user5.myQuestions.questions.push(question);
                                    console.log('.....报存用户提问',user5);
                                    user5.save(function (err, ques1) {
                                        if (err) {
                                            console.log('.....报存用户提问1',ques1);
                                            res.json({status: 0, mes: '保存用户提问失败!'});
                                        }else{
                                            res.json({status: 1, mes: '提问成功',question:question1});
                                        }
                                    })
                                }
                            })

                    }
                })
        })
    } else{
        res.json({status: 0, mes: '失败'});
    }
}