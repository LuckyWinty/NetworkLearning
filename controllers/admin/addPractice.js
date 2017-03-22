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
        var practices = req.body.practice.choice.split(',');
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
};
