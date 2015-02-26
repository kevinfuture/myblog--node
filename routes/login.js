/**
 * Created by kevin on 2015/2/20/0020.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var crypto = require('crypto');
var islogin = require('../routes/islogin');

//创建对象
var isLogin = new islogin();

router.get('/login', isLogin.checkNotLogin);
router.get('/login', function(req, res) {
    res.render('login', {
        title: '用户登入'
    });
});


router.post('/login', isLogin.checkNotLogin);
router.post('/login', function(req, res) {
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    mongoose.model('User').count({name:req.body.username}, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        mongoose.model('User').findOne({name:req.body.username},function(err,user){
            if(user) {
                var user_get = new User.User(user);
            }
            if (user_get.password != password) {
                req.flash('error', '用户口令错误');
                return res.redirect('/login');
            }
            req.session.user = user_get;
            req.flash('success', '登入成功');
            res.redirect('/');
        });
        console.log('user：'+user);

    });
});

module.exports = router;
