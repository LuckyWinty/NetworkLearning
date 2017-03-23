/**
 * Created by winty on 2017/2/1.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');

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
