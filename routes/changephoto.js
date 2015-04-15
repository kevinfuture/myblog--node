var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var islogin = require('../routes/islogin');
var setting = require('../setting');
var fs = require('fs');


var isLogin = new islogin();
/* GET changephoto page. */
router.get('/changephoto', isLogin.checkLogin);
router.get('/changephoto', function(req, res) {
    mongoose.model('User').find(function(err, user){
        if(err){
            user = [];
        }
        res.render('changephoto', {
            title: '首页',
            user : req.session.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    });
});
router.post('/changephoto', isLogin.checkLogin);
router.post('/changephoto', function(req, res, next) {
    var pic = req.files.headPic,
        temtype,
        mat = pic.type.match(/(gif|jpeg|png)/g),
        originalpath = pic.path,
        newpath = setting.uploadDir+'headPic'+req.session.user.name+'.';
    var ImageType = {
        'jpeg':'jpg',
        'jpg':'jpg',
        'gif':'gif',
        'png':'png'
    };
    if(!mat){
        req.flash('error', '（︶︿︶） 图片格式不对吧亲~');
        fs.unlink(originalpath);
        return res.redirect('/changephoto');
    }else if(pic.length > 204800){
        req.flash('error','（︶︿︶） 图片太大了，服务器表示鸭梨好大');
        fs.unlink(originalpath);
        return res.redirect('/changephoto');
    }else if(pic.length==undefined){
        req.flash('error','（︶︿︶） 亲，还没有选择图片吧！');
        fs.unlink(originalpath);
        return res.redirect('/changephoto');
    }
    temtype = ImageType[mat[0]];
    console.log("*************************************");
    fs.rename(originalpath,newpath+=temtype,function(err){
        console.log("#####################"+req.session.user._id);
        mongoose.model('User').findOneAndUpdate({_id:req.session.user._id},{headPic:newpath}, function(err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/changephoto');
            }
            res.redirect('/users');
        });
    })
});

module.exports = router;
