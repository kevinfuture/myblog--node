var express = require('express');
var router = express();
var mongoose = require('mongoose');
var EssayPost = require('../../../models/EssayPost');
var Comment = require('../../../models/Comment');
//要删除EssayPost跟Comment中的内容

/* GET Follow page. */
module.exports = function(router) {
    router.get('/essayDel', function (req, res) {
        var getId = req.query.essayid,
            getCaption = req.query.essayCaption;
        if (!req.session.user) {
            req.flash('error', '╮(╯﹏╰)╭，还没有登录—');
            return res.redirect('/login');
        };
        mongoose.model('EssayPost').remove({_id: getId}, function (delEerr, delEssayById) {
            mongoose.model('Comment').remove({username:req.session.user.name,caption:getCaption}, function (delCerr, delCommentByUsercaption) {
                if (delEerr) {
                    req.flash('error', delEerr);
                    return res.redirect('/' + req.session.user.name+'/Essay/essaylist');
                }
                if (delCerr) {
                    req.flash('error', delCerr);
                    return res.redirect('/' + req.session.user.name+'/Essay/essaylist');
                }
                delete req.session.essay;
                return res.redirect('/' + req.session.user.name+'/Essay/essaylist');
            });
        });
    });
}
