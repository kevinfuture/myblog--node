var express = require('express');
var router = express.Router();
var crypto =require('crypto');
var mongoose = require('mongoose');
var User = require('../models/User.js');
/* GET users listing. */
router.get('/users', function(req, res) {
    mongoose.model('User').find(req.session.user, function(err, user) {
        if (err) {
            req.flash('error', err);//这里没有输出错误
            return res.redirect('/');
        }
        var currentUser = req.session.user;
        if (!currentUser) {
            req.flash('error', '请登录！！！');
            return res.redirect('/login');
        }
        res.render('users', {
            title: '个人中心',
            user : req.session.user,
            funscount:req.session.funscount==null?0:req.session.funscount,
            followcount:req.session.followcount==null?0:req.session.funscount,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    });
});
router.post('/users', function(req, res) {
    mongoose.model('User').findOneAndUpdate({name:req.session.user.name},{name:req.body.username,age:req.body.age,tel:req.body.tel,email:req.body.email}, function(err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/users');
        }
        req.session.user=user;//这里对session进行修改就完成了session的匹配，实时的session更新
        res.redirect('/');
    });
});

module.exports = router;