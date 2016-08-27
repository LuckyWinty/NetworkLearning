var mongoose=require('mongoose');
var User=mongoose.model('User');
var index = require('../routes/index');

module.exports.login = function(req, res){
    User.findOne({account:req.body.account},function(error,person){
        if(error){
            console.log(error);
        }else if(person){
            res.render('error', { error:{type: '该用户已存在！',message:'直接登录吧！' }});
        }else{
            User.create({
                account:req.body.account,
                password:req.body.password
            },function(error,User){
                if(error){
                    console.log(error);
                }else{
                    res.render('index', { title: '注册成功，来到首页' });
                }
            })
        }
    })
};