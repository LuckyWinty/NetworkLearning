/**
 * Created by Administrator on 2016/8/17.
 */
var mongoose=require('mongoose');
var dbUrl=require('../configure/urlConfigures');

mongoose.connect(dbUrl.dbUrl);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbUrl.dbUrl);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});