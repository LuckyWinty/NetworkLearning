/**
 * Created by winty on 2017/1/12.
 */
var mongoose = require('mongoose');
require('../../model/model');
var User = mongoose.model('User');

module.exports.doAdd = function(req, res){
  console.log(req);
  //var busboy = new Busboy({headers: req.headers});
  //var fileIds = [];
  //var body = {};
  //
  //busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
  //  fileIds.push(new mongo.ObjectId());
  //  console.log('got file', fieldname, filename);
  //  var writeStream = gfs.createWriteStream({
  //    _id: fileIds[fileIds.length-1],
  //    filename: filename,
  //    mode: 'w',
  //    content_type: mimetype
  //  });
  //  file.pipe(writeStream);
  //}).on('field', function (key, value) {
  //  body[key] = value;
  //}).on('finish', function () {
  //  console.log('--------see')
  //});
  //
  //req.pipe(busboy);
  res.json({test:'123'});
};