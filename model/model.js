/**
 * Created by winty on 2016/8/16.
 */
var mongoose=require('mongoose');
var grid=require('gridfs-stream');
var dbUrl=require('../configure/urlConfigures');

var UserSchema=new mongoose.Schema({
    account:String,
    password:String
});



mongoose.model('User', UserSchema);