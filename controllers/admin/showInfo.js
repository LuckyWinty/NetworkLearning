/**
 * Created by winty on 2017/2/1.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');
var Comment = mongoose.model('Comment');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var Item=mongoose.model('Item');

module.exports.showUsers = function(req, res){
   User.find({})
       .sort({'power':-1})
       .exec(function(error,users) {
           if (error) {
               console.log('.....查找所有用户', error);
           } else {
               res.json({status: 1, users: users});
           }
       })
};
module.exports.showSubjects = function(req, res){
    Subject.find({})
        .sort({'power':-1})
        .exec(function(error,Subjects) {
            if (error) {
                console.log('.....查找所有课程', error);
            } else {
                res.json({status: 1, subjects: Subjects});
            }
        })
};
module.exports.showQuestions = function(req, res){
    Question.find({})
        .sort({'power':-1})
        .exec(function(error,Questions) {
            if (error) {
                console.log('.....查找所有课程', error);
            } else {
                res.json({status: 1, questions: Questions});
            }
        })
};
module.exports.showItems = function(req, res){
    Item.find({})
        .sort({'power':-1})
        .exec(function(error,Items) {
            if (error) {
                console.log('.....查找所有课程', error);
            } else {
                res.json({status: 1, items: Items});
            }
        })
};
module.exports.showOneItem = function(req, res){
    if(req.body.itemId){
        Item.findOne({'_id': req.body.itemId})
            .exec(function(error,item){
                if(error){
                    console.log('.....查找出错',error);
                }else{
                    res.json({status: 1,item:item, mes: '查找成功！'});
                }
            })
    }else{
        res.json({status: 0,mes: '找不到习题信息！'});
    }
};
