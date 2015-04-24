var express = require('express');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var User = require('../../../models/User');//在newessay.js文件所在父目录的父目录的父目录下存在models文件夹所以用三个“../”
var EssayPost = require('../../../models/EssayPost');

/* GET home page. */
router.get('/Essay/newessay', function(req, res, next) {
    var getUrl = req.url;
        if (!req.session.user) {
            req.flash('error', '╮(╯﹏╰)╭，还没有登录！！！');
            return res.redirect('/login');
        }
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^ '+getUrl);
    if (getUrl=='/Essay/newessay'||getUrl=='/Essay/newessay/') {
        return res.redirect('/Essay/newessay/?newESSAY=NEW');
    }
    mongoose.model('EssayPost').findOne({_id:req.query._id},function(err,essay){
        res.render('Blog/Essay/newessay', {
            essay:essay,
            newESSAY:req.query.newESSAY
        });
    });
});

router.post('/Essay/newessay', function(req, res, next) {
    mongoose.model('User').findOne({name:req.session.user.name},function(err,user) {
        var age = moment(moment(user.baseObj[0].Date).format('YYYY/MM/DD'), 'YYYYMMDD').fromNow().split(' ');
        user.baseObj[0].Date = age[0] + ' ' + age[1];
        mongoose.model('EssayPost').findOne({
            username: req.session.user.name,
            caption: req.body.caption
        }, function (err, essay) {
            mongoose.model('Comment').find({username: req.session.user.name}).sort({'_id': -1}).limit(10).exec(function (err, newcommentlist) {
                newcommentlist.forEach(function (value, index, array) {
                    array[index].baseObj[0].Date = moment(array[index].baseObj[0].Date).format('YYYY/MM/DD hh:mm a');
                    console.log('时间：' + array[index].baseObj[0].Date);
                });
                mongoose.model('EssayPost').count({username: req.session.user.name}, function (err, essaycount) {//这里返回的是总的文章个数
                    mongoose.model('Comment').count({username: req.session.user.name}, function (err, commmentcount) {//这里返回的是总的评论数
                        mongoose.model('EssayPost').find({username: req.session.user.name}, function (err, essaylist) {//这里返回的是对象
                            console.log('获取id测试：' + req.body.essay_id);
                            if (essay == null) {
                                var newEssayPost = new EssayPost.EssayPost({
                                    username: req.session.user.name,
                                    caption: req.body.caption,
                                    content: req.body.content,
                                    TDate: moment(Date.now()).format('l'),
                                    commentcount:0
                                });
                                newEssayPost.save(function (err) {
                                    if (err) {
                                        req.flash('error', err);
                                        return res.redirect('/Essay/newessay');
                                    }
                                    req.flash('success', 'O(∩_∩)O哈，创建新日志成功！！！');
                                    //return res.render('Blog/index', {
                                    //    user: user,
                                    //    essaycount: essaycount == 0 ? 0 : essaycount,//文章数目
                                    //    essaylist: essaylist,//文章的对象
                                    //    newcommentlist: newcommentlist,
                                    //    commmentcount: commmentcount,
                                    //    currentpages:1
                                    //});用下边的替换
                                    res.redirect('/'+user.name);
                                });
                            } else {
                                if(req.body.newESSAY){
                                    if(essay.caption==req.body.caption){
                                        req.flash('error', '╮(╯﹏╰)╭，已经存在改标题了~');
                                        return res.redirect('/Essay/newessay/?newESSAY=NEW');
                                    }
                                }
                                mongoose.model('EssayPost').findOneAndUpdate({
                                    username: req.session.user.name,
                                    caption: req.body.caption
                                }, {
                                    caption: req.body.caption,
                                    content: req.body.content,
                                    TDate: moment(Date.now()).format('l')
                                }, function (err, essay) {
                                    if (err) {
                                        req.flash('error', err);
                                        return res.render('Blog/Essay/newessay', {
                                            title: req.session.user.name + '的随笔',
                                            caption: essay == null ? null : essay.caption,
                                            content: essay == null ? null : essay.content
                                        });
                                    }
                                    //return res.render('Blog/index', {
                                    //    user: user,
                                    //    essaycount: essaycount == 0 ? 0 : essaycount,//文章数目
                                    //    essaylist: essaylist,//文章的对象
                                    //    newcommentlist: newcommentlist,
                                    //    commmentcount: commmentcount,
                                    //    currentpages:1
                                    //});用下边的替换
                                    res.redirect('/'+user.name);
                                });
                            }
                        });
                    });
                });
            });
        });
    });
});
module.exports = router;