var express = require('express');
var router = express();
var mongoose = require('mongoose');
var Comment = require('../../../models/Comment');
var EssayPost = require('../../../models/EssayPost');

/* GET Follow page. */
module.exports = function(router) {
    router.get('/commentDel', function (req, res) {
        var commentid = req.query.commentid,
            essayUsername = req.query.essayUsername,
            essayCaption = req.query.essayUsername;
        if (!req.session.user) {
            req.flash('error', '未登入');
            return res.redirect('/login');
        }
        mongoose.model('Comment').remove({_id: commentid}, function (delComerr, delCommentById) {
            mongoose.model('EssayPost').findOne({username: essayUsername,caption:essayCaption}, function (essayErr, findIdByUserCaption) {
                if (delComerr) {
                    req.flash('error', delComerr);
                    return res.redirect('/Essay/showessay/' + findIdByUserCaption._id);
                }
                return res.redirect('/Essay/showessay/' + findIdByUserCaption._id);
            });
        });
    });
}