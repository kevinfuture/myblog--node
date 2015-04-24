var express = require('express');
var router = express.Router();
var crypto =require('crypto');
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Follow = require('../models/Follow');


/* GET users listing. */
router.get('/users', function(req, res) {
    mongoose.model('Follow').find({whofollowname: req.session.currentUserName}).sort({'_id': -1}).limit(3).exec(function (err, follow) {//我关注的人
        mongoose.model('User').find({username:follow[0]}, function (err, follow1) {//根据follow查询出关注的三个人
            mongoose.model('User').find({username: follow[1]}, function (err, follow2) {//根据follow查询出关注的三个人
                mongoose.model('User').find({username: follow[2]}, function (err, follow3) {//根据follow查询出关注的三个人
                    mongoose.model('User').find({}).sort({'_id': -1}).limit(3).exec(function (err, newUserList) {//查询最新加入的人
                        mongoose.model('User').find(req.session.user, function (err, user) {
                            if (err) {
                                req.flash('error', err);//这里没有输出错误
                                return res.redirect('/');
                            }
                            var currentUser = req.session.user;
                            req.session.followObject = follow;
                            req.session.follow1 = follow1;
                            req.session.follow2 = follow2;
                            req.session.follow3 = follow3;
                            req.session.newUserList = newUserList;
                            if (!currentUser) {
                                req.flash('error', '╮(╯▽╰)╭，还没有登录呢！！！');
                                return res.redirect('/login');
                            }
                            res.render('users', {
                                title: '个人中心',
                                user: req.session.user,
                                funscount: req.session.funscount == null ? 0 : req.session.funscount,
                                followcount: req.session.followcount == null ? 0 : req.session.funscount,
                                success: req.flash('success').toString(),
                                error: req.flash('error').toString(),
                                followList: follow,
                                follow1: follow1 == null ? null : follow1,
                                follow2: follow2 == null ? null : follow2,
                                follow3: follow3 == null ? null : follow3,
                                newUserList:newUserList==null?null:newUserList
                            });
                        });
                    });
                });
            });
        });
    });
});
router.post('/users', function(req, res) {
    if (req.body['tel'].match( /(\d)(\d)/)==null) {
        req.flash('error', 'O(∩_∩)O哈哈~，不要开玩笑了，你的年龄肯定不是这样的');
        return res.redirect('/users');
    }
    //if (req.body['tel'].match( /1[358]\\d{9}/)==null) {
    //    req.flash('error', '╮(╯▽╰)╭，你似乎输错手机号码了！');
    //    return res.redirect('/users');
    //}
    //if (req.body['email'].match( /[a-zA-Z0-9_]+@[a-zA-Z0-9]+(\\.[a-zA-Z]+)+/)==null) {
    //    req.flash('error', '邮箱格式不对( ⊙ o ⊙ )啊！！');
    //    return res.redirect('/users');
    //}
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