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
        mat = pic.type.match(/(gif|jpeg|png|jpg)/g),
        originalpath = pic.path,
        newpath = '../../mycode/blog/public/'+setting.uploadDir+'headPic'+req.session.user.name+'.';
    var target = new Array();
    var ImageType = {
        'jpeg':'jpg',
        'jpg':'jpg',
        'gif':'gif',
        'png':'png'
    };
    if(pic.size==0){
        req.flash('error','（︶︿︶） 亲，还没有选择图片吧！');
        console.log("还没有选择图片吧");
        fs.unlink(originalpath);
        return res.redirect('/changephoto');
    }else if(!mat){
        req.flash('error', '（︶︿︶） 图片格式不对吧亲~');
        console.log("图片格式不对");
        fs.unlink(originalpath);
        return res.redirect('/changephoto');
    }else if(pic.size > 204800){
        req.flash('error','（︶︿︶） 图片太大了，服务器表示鸭梨好大');
        console.log("图片太大了");
        fs.unlink(originalpath);
        return res.redirect('/changephoto');
    }
    temtype = ImageType[mat[0]];
    newpath+=temtype;
    var path = 'D:/NodeProject/mycode/blog/public'+newpath;
    fs.unlink(newpath,function(deleteerr){
        fs.rename(originalpath,newpath,function(err){
            console.log("#####################"+req.session.user._id);
            mongoose.model('User').findOneAndUpdate({_id:req.session.user._id},{headPic:newpath}, function(err, user) {
                if(deleteerr)
                {console.log(deleteerr);}
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/changephoto');
                }
                res.redirect('/users');
            });
        })

        console.log('ddddd');
    })
    console.log('$$$$$$$$$$$$'+newpath);

});

module.exports = router;
