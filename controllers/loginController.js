var mongoose=require('mongoose');
var User=mongoose.model('User');
var index = require('../routes/index');

module.exports.login = function(req, res){
    User.findOne({account:req.body.account},function(error,person){
        if(error){
            console.log(error);
        }else if(person){
            if(person.password!=req.body.password){
                res.render('error', { error:{type: '密码错误！',message:'请检查密码是否正确！',href:'/login'}});
            }else{
                res.render('index', { title: '登录成功，来到首页' });
            }
            
        }else{
            res.render('error', { error:{type: '该用户不存在！',message:'请先注册！',href:'/regist'}});
        }
    })
};