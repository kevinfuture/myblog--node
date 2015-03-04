var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var User = require('../../models/User.js');
var EssayPost = require('../../models/EssayPost');

/* GET home page. */
router.get('/:users', function(req, res, next) {
    //console.log('获取地址栏信息：'+util.inspect(url.parse(req.url, true))+'***');据说使用这种方式，但是我没有成功
    var name = req.url.substring(1,15);//获取地址栏信息
    mongoose.model('User').findOne({name:name},function(err,user) {
        if (!user) {//这个地方要重新写
            req.flash('error', '没有找到园主！请登录使用！');
            return res.redirect('/login');
        }
        var age = moment(moment(user.baseObj[0].Date).format('YYYY/MM/DD'), 'YYYYMMDD').fromNow().split(' ');
        user.baseObj[0].Date = age[0] + ' ' + age[1];
        mongoose.model('EssayPost').count({username: name}, function (err, essaycount) {//这里返回的是个数
            mongoose.model('EssayPost').find({username: name}, function (err, essaylist) {//这里返回的是对象
                //***************注意以后这里要做分页********************
                res.render('Blog/index', {
                    title: name,
                    user: user,
                    essaycount: essaycount==0?0:essaycount,//文章数目
                    essaylist:essaylist//文章的对象
                });
            });
        });
    });
   // res.render(name, { title: '我的博客' });//这个地方用 'Blog/index','/Blog/index'
    //*****这个的是针对域名的，但是app.js中路由的渲染是对文件的*****
});

module.exports = router;
