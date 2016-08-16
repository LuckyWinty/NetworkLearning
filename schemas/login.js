/**
 * Created by winty on 2016/8/16.
 */
var mongoose=require('mongoose');

var UserSchema=new mongoose.Schema({
    account:String,
    password:String
})

module.exports=UserSchema;