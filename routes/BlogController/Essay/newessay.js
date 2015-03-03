var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../../models/User');//在newessay.js文件所在父目录的父目录的父目录下存在models文件夹所以用三个“../”
var EssayPost = require('../../../models/EssayPost');

/* GET home page. */
router.get('/Essay/newessay', function(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '请登录！！！');
            return res.redirect('/login');
        }
    res.render('Blog/Essay/newessay', { title: '随笔' });
});

router.post('/Essay/newessay', function(req, res, next) {
    var newEssayPost = new EssayPost.EssayPost({
        username: req.session.user.name,
        caption:req.body.caption,
        content:req.body.content
    });
    console.log('user对象：'+req.session.user);
        console.log('username：'+req.session.user.name);
        console.log('标题：'+req.body.caption);
        console.log('内容：'+req.body.content);
    newEssayPost.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/Essay/newessay');
        }
        req.flash('success', '创建新随笔成功！！！');
         res.redirect('/'); 
    });
});
module.exports = router;