/**
 * Created by winty on 2017/1/12.
 */
var mongoose = require('mongoose');
require('../models/model');
var User = mongoose.model('User');

module.exports.doAdd = function(req, res){
  console.log(req.body.data);
};