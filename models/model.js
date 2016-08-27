var mongoose=require('mongoose');
var UserSchema=require('../schemas/model');
var User=mongoose.model('User',UserSchema);

module.exports=User;