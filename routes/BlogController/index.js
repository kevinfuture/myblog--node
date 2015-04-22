var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url= require('url');
var moment = require('moment');
var User = require('../../models/User.js');
var EssayPost = require('../../models/EssayPost');
var Comment = require('../../models/Comment');
var Follow = require('../../models/Follow');

/* GET home page. */
//router.get('/:users?/:calenderdate?/:page?', function(req, res, next) {
router.get('/:users?', function(req, res, next) {
   // var splitname = req.url.substring(1,30).split('/?');//获取地址栏信息
    //var name=splitname[0].split('/');
    var name=req.params.users;
    var calenderdate = req.query.calenderdate;
    var page = req.query.page||1;
    console.log("*************calenderdate:"+calenderdate);
    console.log(page);
    mongoose.model('Follow').count({followwhoname: name}, function (err, funscount) {//返回用户粉丝的数量
        mongoose.model('Follow').count({whofollowname: name}, function (err, followcount) {//返回用户关注人的数量
            mongoose.model('User').findOne({name: name}, function (err, user) {
                mongoose.model('Comment').count({username: name}, function (err, commmentcount) {//这里返回的是总的评论数
                    if (!user) {//这个地方要重新写,不要跳转到登录页面，要在进行判断
                        req.flash('error', '没有找到园主！请登录使用！');
                        return res.redirect('/login');
                    }
                    var age = moment(moment(user.baseObj[0].Date).format('YYYY/MM/DD'), 'YYYYMMDD').fromNow().split(' ');
                    user.baseObj[0].Date = age[0] + ' ' + age[1];
                    if (!calenderdate) {
                        mongoose.model('EssayPost').count({username: name}, function (err, essaycount) {//这里返回的是总的文章个数
                            mongoose.model('EssayPost').find({username: name}).sort({'_id': -1}).skip((page - 1) * 10).limit(10).exec(function (err, essaylist) {//这里返回的是对象
                                //***************注意以后这里要做分页********************
                                mongoose.model('Comment').find({username: name}).sort({'_id': -1}).limit(10).exec(function (err, newcommentlist) {
                                    newcommentlist.forEach(function (value, index, array) {
                                        array[index].baseObj[0].Date = moment(array[index].baseObj[0].Date).format('YYYY/MM/DD hh:mm a');
                                    });
                                    req.session.calenderdate = calenderdate;
                                    req.session.currentUserName = name;
                                    res.render('Blog/index', {
                                        user: user,
                                        userMacth:req.session.user==null?false:(req.session.user.name==name?true:false),
                                        essaycount: essaycount == 0 ? 0 : essaycount,//文章数目
                                        essaylist: essaylist,//文章的对象
                                        newcommentlist: newcommentlist,
                                        commmentcount: commmentcount,
                                        calenderdate: calenderdate,
                                        currentpages: page == null ? 1 : page,
                                        funscount:funscount,
                                        followcount:followcount
                                    });
                                });
                            });
                        });
                    } else {
                        mongoose.model('EssayPost').count({
                            username: name,
                            TDate: calenderdate
                        }, function (err, essaycount) {//这里返回的是总的文章个数
                            mongoose.model('EssayPost').find({
                                username: name,
                                TDate: calenderdate
                            }).sort({'_id': -1}).skip((page - 1) * 10).limit(10).exec(function (err, essaylist) {//这里返回的是对象
                                //***************注意以后这里要做分页********************
                                mongoose.model('Comment').find({username: req.session.user.name}).sort({'_id': -1}).limit(10).exec(function (err, newcommentlist) {
                                    newcommentlist.forEach(function (value, index, array) {
                                        array[index].baseObj[0].Date = moment(array[index].baseObj[0].Date).format('YYYY/MM/DD hh:mm a');
                                        console.log('时间：' + array[index].baseObj[0].Date);
                                    });
                                    res.render('Blog/index', {
                                        user: user,
                                        userMacth:req.session.user==null?false:(req.session.user.name==name?true:false),
                                        essaycount: essaycount == 0 ? 0 : essaycount,//文章数目
                                        essaylist: essaylist,//文章的对象
                                        newcommentlist: newcommentlist,
                                        commmentcount: commmentcount,
                                        calenderdate: calenderdate,
                                        currentpages: page == null ? 1 : page,
                                        funscount:funscount,
                                        followcount:followcount
                                    });
                                });
                            });
                        });
                    }
                });
            });
        });
    });
});

module.exports = router;
