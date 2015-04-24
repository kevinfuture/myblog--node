var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var EssayPost = require('../../../models/EssayPost');

/* GET home page. */
router.get('/:user?/Essay/essaylist', function(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '┗|｀O′|┛ 嗷~~一定要先登录再管理随笔哈！！');
        return res.redirect('/login');
    }
    mongoose.model('EssayPost').count({username:req.session.user.name}, function(err, essaypost) {
        mongoose.model('EssayPost').find({username:req.session.user.name}).sort({'_id': -1}).limit(10).exec(function(err,essaypost){
            essaypost.forEach(function(value,index,array){
                array[index].baseObj[0].Date=moment(array[index].baseObj[0].Date).format('YYYY/MM/DD hh:mm a');
            });
            res.render('Blog/Essay/essaylist', {
                title: req.session.user.name+'的随笔',
                essaylist:essaypost,
                funscount:req.session.funscount==null?0:req.session.funscount,
                followcount:req.session.followcount==null?0:req.session.funscount,
                followList: req.session.followObject==null?null: req.session.followObject,
                follow1: req.session.follow1==null?null: req.session.follow1,
                follow2: req.session.follow2==null?null: req.session.follow2,
                follow3: req.session.follow3==null?null: req.session.follow3,
                newUserList:req.session.newUserList==null?null:req.session.newUserList
            });
        });
    });
});

module.exports = router;
