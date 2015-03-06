var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var User = require('../../models/User.js');
var EssayPost = require('../../models/EssayPost');

/* GET home page. */
router.get('/:users/:calenderdate?', function(req, res, next) {
    var splitname = req.url.substring(1,30).split('/?');//获取地址栏信息
    var name=splitname[0];
    console.log('#####:'+splitname[0]);
    console.log('*************:'+splitname[1]);
    mongoose.model('User').findOne({name:name},function(err,user) {
        if (!user) {//这个地方要重新写,不要跳转到登录页面，要在进行判断
            req.flash('error', '没有找到园主！请登录使用！');
            return res.redirect('/login');
        }
        if(!splitname[1]) {
            mongoose.model('EssayPost').count({username: name}, function (err, essaycount) {//这里返回的是总的文章个数
                mongoose.model('EssayPost').find({username: name}, function (err, essaylist) {//这里返回的是对象
                    //***************注意以后这里要做分页********************
                    res.render('Blog/index', {
                        title: name,
                        user: user,
                        essaycount: essaycount == 0 ? 0 : essaycount,//文章数目
                        essaylist: essaylist//文章的对象
                    });
                });
            });
        }else{
            mongoose.model('EssayPost').count({username: name,TDate:req.params.calenderdate}, function (err, essaycount) {//这里返回的是总的文章个数
                mongoose.model('EssayPost').find({username: name,TDate:req.params.calenderdate}, function (err, essaylist) {//这里返回的是对象
                    //***************注意以后这里要做分页********************
                    res.render('Blog/index', {
                        title: name,
                        user: user,
                        essaycount: essaycount==0?0:essaycount,//文章数目
                        essaylist:essaylist//文章的对象
                    });
                });
            });
        }
    });
});

module.exports = router;
