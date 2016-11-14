/**
 * Created by winty on 2016/11/14.
 */
var mongoose = require('mongoose');

mongoose.connect(dbUrl.dbUrl); //连接本地photo_app数据库
var schema = new mongoose.Schema({name: String, path: String});
module.exports = mongoose.model('Photo', schema);