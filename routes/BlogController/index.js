var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var User = require('../models/User.js');

/* GET home page. */
router.get('/Blog/index', function(req, res, next) {
    res.render('Blog/index', { title: 'Blog' });//这个地方用 'Blog/index','/Blog/index'
    //*****这个的是针对域名的，但是app.js中路由的渲染是对文件的*****
});

module.exports = router;
