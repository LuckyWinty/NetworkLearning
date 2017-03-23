/**
 * Created by winty on 2017/3/22.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');
var Item = mongoose.model('Item');

module.exports.addPractice = function(req, res){
    console.log('---------出题')
    if(req.body.practice){
        var practices = handlerChoice(req.body.practice.choice);
        var moreInfos = req.body.practice.correctChoice.split(',');
        Item.create({
            content: req.body.practice.content,
            explain: req.body.practice.explain,
            belong: req.body.practice.belong,
            choice: practices,
            correctChoice: moreInfos
        }, function (error, practice) {
            if (error) {
                console.log('-----------error',error)
                res.json({status: 0, mes: '录入练习失败！'});
            } else {
                res.json({status: 1, mes: '录入练习成功！'});
            }
        })
    }
    function handlerChoice(choice){
       var arr = [];
       var temp = {0:'A',1:'B',2:'C',3:'D',4:'E',5:'F',6:'G',7:'H',8:'I',9:'J'};
       var arr1 = choice.split(',');
       for(var i = 0;i < arr1.length;i++){
           arr.push({option:temp[i]+':'+arr[1]})
       }
       return arr;
    }
};
