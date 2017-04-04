/**
 * Created by winty on 2017/3/31.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');
var Subject = mongoose.model('Subject');
var Comment = mongoose.model('Comment');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var Link = mongoose.model('Link');
var Item = mongoose.model('Item');

module.exports.resetPassword = function(req, res){
    if(req.body.user){
        var userId = req.body.user._id;
        User.findOne({_id: userId})
            .exec(function (err, person) {
                if (err) {
                    res.json({status: 0, mes: '失败'});
                } else {
                    person.password = '12345678';
                    person.save(function (err, p) {
                        if (err) {
                            res.json({status: 0, mes: '回复失败'});
                        } else {
                            res.json({status: 1, person: p, mes: '重置成功,密码已重置为:12345678,请知悉!'});
                        }
                    })
                }
            })
    }else{
        res.json({status: 0, mes: '失败'});
    }
}
module.exports.deletUser = function(req, res){
    if(req.body.user){
        var userId = req.body.user._id;
        User.remove({_id: userId})
            .exec(function (err, person) {
                if (err) {
                    res.json({status: 0, mes: '失败'});
                } else {
                    res.json({status: 1, mes: '删除用户成功!'});
                }
            })
    }else{
        res.json({status: 0, mes: '失败'});
    }
}
module.exports.updateSubject = function(req, res){
    if(req.body.subject){
        Subject.findOne({'_id': req.body.subject._id})
            .exec(function(error,Subject){
                if(error){
                    console.log('.....查找课程出错',error);
                }else{
                    var practices = analysisLink(req.body.subject.practice);
                    var moreInfos = analysisLink(req.body.subject.moreInfo);
                    Subject.title = req.body.subject.title;
                    Subject.desc = req.body.subject.desc;
                    Subject.level = req.body.subject.level;
                    Subject.learnTime = req.body.subject.learnTime;
                    Subject.content = req.body.subject.content;
                    Subject.mustKnow = req.body.subject.mustKnow;
                    Subject.practices = practices;
                    Subject.moreInfos = moreInfos;
                    Subject.save(function (error, Subj) {
                        if (error) {
                            console.log('-----------error',error)
                            res.json({status: 0, mes: '更新课程失败！'});
                        } else {
                            res.json({status: 1, mes: '更新课程成功！'});
                        }
                    })
                }
        })
    }
    function analysisLink(str){
        var arr = [];
        var strs = str.split(',');

        var i = 0;
        while (i < strs.length) {
            var practice = new Link;
            practice.name = strs[i].split('|')[0];
            practice.url = strs[i].split('|')[1]?strs[i].split('|')[1]:'';
            arr.push(practice);
            i++;
        }
        return arr;
    }
};
module.exports.DeleteSubject = function(req, res){
    if(req.body.subject){
        var subjectId = req.body.subject._id;
        Subject.remove({_id: subjectId})
            .exec(function (err, Subject) {
                if (err) {
                    res.json({status: 0, mes: '失败'});
                } else {
                    res.json({status: 1, mes: '删除成功!'});
                }
            })
    }else{
        res.json({status: 0, mes: '失败'});
    }
}
module.exports.deleteQuestion = function(req, res){
    if(req.body.question){
        var questionId = req.body.question._id;
        Question.remove({_id: questionId})
            .exec(function (err, question) {
                if (err) {
                    res.json({status: 0, mes: '失败'});
                } else {
                    res.json({status: 1, mes: '删除成功!'});
                }
            })
    }else{
        res.json({status: 0, mes: '失败'});
    }
}
module.exports.deleteItem = function(req, res){
    if(req.body.item){
        var itemId = req.body.item._id;
        Item.remove({_id: itemId})
            .exec(function (err, item) {
                if (err) {
                    res.json({status: 0, mes: '失败'});
                } else {
                    res.json({status: 1, mes: '删除成功!'});
                }
            })
    }else{
        res.json({status: 0, mes: '失败'});
    }
}
module.exports.updateItem = function(req, res){
    if(req.body.item){
        Item.findOne({'_id': req.body.item._id})
            .exec(function(error,item){
                if(error){
                    console.log('.....查找课程出错',error);
                }else{
                    var practices = handlerChoice(req.body.item.choice);
                    var moreInfos = req.body.item.correctChoice.split(',');
                    item.content = req.body.item.content;
                    item.explain = req.body.item.explain;
                    item.belong = req.body.item.belong;
                    item.choice = practices;
                    item.correctChoice = moreInfos;
                    item.save(function (error, It) {
                        if (error) {
                            console.log('-----------error',error)
                            res.json({status: 0, mes: '更新习题失败！'});
                        } else {
                            res.json({status: 1, mes: '更新习题成功！'});
                        }
                    })
                }
            })
    }
    function handlerChoice(choice){
        var arr = [];
        var temp = {0:'A',1:'B',2:'C',3:'D',4:'E',5:'F',6:'G',7:'H',8:'I',9:'J'};
        var arr1 = choice.split(',');
        for(var i = 0;i < arr1.length;i++){
            arr.push({option:temp[i]+': '+arr1[i]})
        }
        return arr;
    }
}
