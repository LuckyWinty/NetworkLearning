/**
 * Created by winty on 2016/8/22.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: '页面登陆' });
});

module.exports = router;
