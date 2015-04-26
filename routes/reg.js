/**
 * Created by kevin on 2015/2/19/0019.
 */
var express = require('express');
var router = express.Router();
var crypto =require('crypto');
var mongoose = require('mongoose');
var UserSchema = require('../models/User.js');
var islogin = require('../routes/islogin');

var isLogin = new islogin();
/* GET home page. */
router.get('/reg', isLogin.checkNotLogin);
router.get('/reg', function(req, res, next) {
    res.render('reg', { title: '注册账号' });
});

router.post('/reg', isLogin.checkNotLogin);
router.post('/reg', function(req, res, next) {
    if (req.body['username'].match( /[a-zA-Z]{4,10}/)==null) {
        req.flash('error', '╮(╯▽╰)╭，用户名是4-10位的字母组成┗|｀O′|┛ 嗷~~');
        return res.redirect('/reg');
    }
    if (req.body['password'].match( /[a-zA-Z]{1,3}[0-9]{1,8}/)==null) {
        req.flash('error', '╮(╯▽╰)╭，密码是1-3位的字母跟1-8位数字组成的不然不安全哈');
        return res.redirect('/reg');
    }
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '╮(╯▽╰)╭，两次输入的口令不一致啊！！！');
        return res.redirect('/reg');
    }
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');
        var newUser = new UserSchema.User({
            name: req.body.username,
            password: password
        });
    //检查用户名是否已经存在
    mongoose.model('User').count({name:newUser.name}, function(err, user) {
        if (user!=0){
            err = '该用户已经存在';
            req.flash('error', err);
            return res.redirect('/reg');
        }
        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }
        //如果不存在则新增用户
        newUser.save(function(err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success', 'O(∩_∩)O哈哈~，注册成功了！');
            res.redirect('/');
        });
    });
});

module.exports = router;

