var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../../models/User');//在newessay.js文件所在父目录的父目录的父目录下存在models文件夹所以用三个“../”
var EssayPost = require('../../../models/EssayPost');
var util=require('util');

/* GET home page. */
router.get('/Essay/showessay/:_id?', function(req, res, next) {
    var usernameAndcaption = req.url.substring(17,30).split('/');//获取地址栏信息并截取有用信息
    var username = usernameAndcaption[0];
    var caption = usernameAndcaption[1];
    mongoose.model('EssayPost').findOne({_id:req.params._id},function(err,essay){
        if(!req.session.user||req.session.user.name!=username)//如果只要求有用户进行登录时候浏览的话才增加“阅读”次数，那么就把||前边的条件去掉
        {
            mongoose.model('EssayPost').findOneAndUpdate({_id:req.params._id},{browsercount:++(essay.browsercount)}, function (err, essay) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/');
                }
            });
        }
        req.session.essay = essay;
        res.render('Blog/Essay/showessay', {
            essay:essay
        });
    });
});

module.exports = router;