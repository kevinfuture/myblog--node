var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var EssayPost = require('../../../models/EssayPost');

/* GET home page. */
router.get('/:user?/Essay/essaylist', function(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '请登录以管理随笔！！');
        return res.redirect('/login');
    }
    mongoose.model('EssayPost').count({username:req.session.user.name}, function(err, essaypost) {
        mongoose.model('EssayPost').find({username:req.session.user.name}).sort({'_id': -1}).limit(10).exec(function(err,essaypost){
            essaypost.forEach(function(value,index,array){
                array[index].baseObj[0].Date=moment(array[index].baseObj[0].Date).format('YYYY/MM/DD hh:mm a');
            });
            res.render('Blog/Essay/essaylist', {
                title: req.session.user.name+'的随笔',
                essaylist:essaypost
            });
        });
    });
});

module.exports = router;
