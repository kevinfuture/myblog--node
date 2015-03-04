var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../../models/User');//在newessay.js文件所在父目录的父目录的父目录下存在models文件夹所以用三个“../”
var EssayPost = require('../../../models/EssayPost');

/* GET home page. */
router.get('/Essay/showessay/:caption?', function(req, res, next) {
    mongoose.model('EssayPost').findOne({username:req.session.user.name,caption:req.params.caption},function(err,essay){
        res.render('Blog/Essay/showessay', {
            title: req.session.user.name+'的随笔',
            caption:essay==null?null:essay.caption,
            content:essay==null?null:essay.content
        });
    });
});

module.exports = router;