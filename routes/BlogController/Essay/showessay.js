var express = require('express');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var User = require('../../../models/User');//在newessay.js文件所在父目录的父目录的父目录下存在models文件夹所以用三个“../”
var EssayPost = require('../../../models/EssayPost');
var Comment = require('../../../models/Comment');
var util=require('util');

/* GET home page. */
router.get('/Essay/showessay/:_id?', function(req, res, next) {
    var usernameAndcaption = req.url.substring(17,30).split('/');//获取地址栏信息并截取有用信息
    var username = usernameAndcaption[0];
    if(!req.session.user)
    { req.flash('error', '╮(╯﹏╰)╭，登录后查看！！！');
        return res.redirect('/login');
    }
    mongoose.model('EssayPost').findOne({_id:req.params._id},function(err,essay) {
        if(essay) {
            mongoose.model('Comment').find({
                username: essay.username,
                caption: essay.caption
            }, function (err, commentlist) {
                commentlist.forEach(function (value, index, array) {
                    array[index].baseObj[0].Date = moment(array[index].baseObj[0].Date).format();
                });
                //if (!req.session.user || req.session.user.name != username)//如果只要求有用户进行登录时候浏览的话才增加“阅读”次数，那么就把||前边的条件去掉
                if (req.session.user==null||req.session.user.name != username){
                    mongoose.model('EssayPost').findOneAndUpdate({_id: req.params._id}, {browsercount: ++(essay.browsercount)}, function (err, essay) {
                        if (err) {
                            req.flash('error', err);
                            return res.redirect('/');
                        }
                    });
                }
                req.session.essay = essay;
                res.render('Blog/Essay/showessay', {
                    currentcomment: null,
                    essay: essay,
                    username:username,
                    comment: commentlist,
                    funscount:req.session.funscount==null?0:req.session.funscount,
                    followcount:req.session.followcount==null?0:req.session.followcount,
                    newUserList:req.session.newUserList==null?null:req.session.newUserList
                });
            });
        }else{
            mongoose.model('Comment').findOne({_id:req.params._id},function(err,thiscomment) {
                mongoose.model('EssayPost').findOne({
                    username: thiscomment==null?null:thiscomment.username,
                    caption: thiscomment==null?null:thiscomment.caption
                }, function (err, essay) {
                    mongoose.model('Comment').find({
                        username: essay.username,
                        caption: essay.caption
                    }, function (err, commentlist) {
                        commentlist.forEach(function (value, index, array) {
                            array[index].baseObj[0].Date = moment(array[index].baseObj[0].Date).format();
                        });
                        if (!req.session.user || req.session.user.name != username)//如果只要求有用户进行登录时候浏览的话才增加“阅读”次数，那么就把||前边的条件去掉
                        {
                            mongoose.model('EssayPost').findOneAndUpdate({_id: req.params._id}, {browsercount: ++(essay.browsercount)}, function (err, essay) {
                                if (err) {
                                    req.flash('error', err);
                                    return res.redirect('/');
                                }
                            });
                        }
                        req.session.essay = essay;
                        res.render('Blog/Essay/showessay', {
                            currentcomment: null,
                            essay: essay,
                            comment: commentlist,
                            funscount:req.session.funscount==null?0:req.session.funscount,
                            followcount:req.session.followcount==null?0:req.session.followcount,
                            newUserList:req.session.newUserList==null?null:req.session.newUserList
                        });
                    });
                });
            });
        }
    });
});

module.exports = router;