/**
 * Created by winty on 2017/1/12.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');

module.exports.doAdd = function(req, res){
  res.json({test:'123'});
};