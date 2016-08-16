var mongoose=require('mongoose');
var UserSchema=require('../schemas/login');
var User=mongoose.model('User',UserSchema);

module.exports=User;