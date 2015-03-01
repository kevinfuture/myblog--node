var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var User = require('../models/User.js');

/* GET home page. */
router.get('/:users', function(req, res, next) {
    //console.log('获取地址栏信息：'+util.inspect(url.parse(req.url, true))+'***');据说使用这种方式，但是我没有成功
    console.log('获取地址栏信息：'+req.url.substring(1,15));
    var name = req.url.substring(1,15);
    mongoose.model('User').findOne({name:name},function(err,user){
        if (!user) {//这个地方要重新写
            console.log('**65575***'+user);
            req.flash('error', '没有找到园主！请登录使用！');
            return res.redirect('/login');
        }
        console.log('user：'+user);
            res.render('Blog/index',{
                title:name
            });
        });
   // res.render(name, { title: '我的博客' });//这个地方用 'Blog/index','/Blog/index'
    //*****这个的是针对域名的，但是app.js中路由的渲染是对文件的*****
});

module.exports = router;
