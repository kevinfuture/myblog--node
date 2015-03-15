var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var crypto = require('crypto');
var islogin = require('../routes/islogin');

//创建对象
var isLogin = new islogin();

router.get('/confirmsecret', isLogin.checkLogin);
router.get('/confirmsecret', function(req, res, next) {
    res.render('confirmsecret', { title: '确认旧密码' });
});

router.post('/confirmsecret', function(req, res) {
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    mongoose.model('User').count({name:req.session.user.name}, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        mongoose.model('User').findOne({name:req.session.user.name},function(err,user){
            if (user.password != password) {
                req.flash('error', '用户口令错误');
                return res.redirect('/confirmsecret');
            }
            req.session.user = user;
            req.flash('success', '验证成功');
            res.redirect('/modifysecret');
        });
    });
});

module.exports = router;
