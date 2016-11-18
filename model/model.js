/**
 * Created by winty on 2016/8/16.
 */
var mongoose=require('mongoose');
var dbUrl=require('../configure/urlConfigures');

var UserSchema=new mongoose.Schema({
    account:String,
    password:String
});

//存储图片文件
//mongoose.connect(dbUrl.dbUrl);
//var conn=mongoose.connection;
//
//var fs=require('fs');
//var grid=require('gridfs-stream');
//grid.mongo=mongoose.mongo;
//
//conn.once('open',function(){
//    console.log('已经open了');
//    var gfs=grid(conn.db);
//
//    var writestream=gfs.createWriteStream({
//        filename:'essayPic'
//    });
//
//    writestream.on('close', function (file) {
//        console.log(file);
//    });
//    fs.createReadStream('public/images/31.jpg').pipe(writestream);
//})


mongoose.model('User', UserSchema);