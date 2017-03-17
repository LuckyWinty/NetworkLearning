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
            content:req.body.content
        },function(error,question){
            if(error){
                res.json({status: 0, mes: '提问失败'});
            }else{
                res.json({status: 1, mes: '提问成功',question:question});
            }
        })
    } else{
        res.json({status: 0, mes: '失败'});
    }
}