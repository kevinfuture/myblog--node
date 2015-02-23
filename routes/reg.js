/**
 * Created by kevin on 2015/2/19/0019.
 */
var express = require('express');
var router = express.Router();
var crypto =require('crypto');
var User = require('../models/User.js');
var islogin = require('../routes/islogin');

var isLogin = new islogin();
/* GET home page. */
router.get('/reg', isLogin.checkNotLogin);
router.get('/reg', function(req, res, next) {
    res.render('reg', { title: '注册账号' });
});

router.post('/reg', isLogin.checkNotLogin);
router.post('/reg', function(req, res, next) {
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '两次输入的口令不一致');
        return res.redirect('/reg');
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var newUser = new User({
        name: req.body.username,
        password: password
    });
    //检查用户名是否已经存在
 User.get(newUser.name, function(err, user) {
        if (user){
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
            console.log(newUser.name+"dfgdfgdgdf");
            req.flash('success', '注册成功');
            res.redirect('/');
        });
    });
});

module.exports = router;

