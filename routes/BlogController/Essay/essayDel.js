var express = require('express');
var router = express();
var mongoose = require('mongoose');
var EssayPost = require('../../../models/EssayPost');
var Comment = require('../../../models/Comment');
//要删除EssayPost跟Comment中的内容

/* GET Follow page. */
module.exports = function(router) {
    router.get('/essayDel', function (req, res) {
        var getId = req.query.essayid;
        if (!req.session.user) {
            req.flash('error', '未登入');
            return res.redirect('/login');
        };
        mongoose.model('EssayPost').remove({_id: getId}, function (delEerr, delEssayById) {
            mongoose.model('Comment').remove({username:req.session.user.name,caption:delEssayById.caption}, function (delCerr, delCommentByUsercaption) {
                if (delEerr) {
                    req.flash('error', delEerr);
                    return res.redirect('/' + user.name+'/Essay/essaylist');
                }
                if (delCerr) {
                    req.flash('error', delCerr);
                    return res.redirect('/' + user.name+'/Essay/essaylist');
                }
                return res.redirect('/' + user.name+'/Essay/essaylist');
            });
        });
    });
}
