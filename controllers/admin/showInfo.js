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