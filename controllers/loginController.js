/**
 * Created by winty on 2017/1/12.
 */
var mongoose = require('mongoose');
require('../model/model');
var User = mongoose.model('User');
var formidable = require('formidable');
var moment=require('moment');


module.exports.doLogin = function(req, res){
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
                    res.json({status: 1, person: person});
                }
            }else{
                res.json({status: 0, mes:'该账户不存在，请注册'});
            }
        });
    });
};