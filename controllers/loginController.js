/**
 * Created by winty on 2017/1/12.
 */
var mongoose = require('mongoose');
require('../model/model');
var User = mongoose.model('User');
var formidable = require('formidable');
var moment=require('moment');


module.exports.doLogin = function(req, res){
    console.log('--------------进入login')
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
        console.log('--------------1',fields)
        User.findOne({userName: fields.userName}, function (error, person) {
            console.log('--------------',person)
            if (error) {
                res.json({status: 0, mes: '登陆失败！'});
            } else if (person) {
                if(person.password!=fields.password){
                    res.json({status: 0, mes: '密码错误！'});
                }else{
                    req.session.user = person;
                    setTimeout(function(){
                      console.log('-----登录的session还在吗',req.session.user)
                    }, 5000)
                    res.json({status: 1, person: person});
                }
            }
        });
    });
};