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
            essayCaption = req.query.essayCaption;
        if (!req.session.user) {
            req.flash('error', '╮(╯﹏╰)╭，还没有登录—');
            return res.redirect('/login');
        }
        mongoose.model('Comment').remove({_id: commentid}, function (delComerr, delCommentById) {
            mongoose.model('EssayPost').findOne({username:req.session.essay.username,caption:req.session.essay.caption},function(err,thisessaycommentcount) {
                mongoose.model('EssayPost').findOneAndUpdate({
                    username: req.session.essay.username,
                    caption: req.session.essay.caption
                }, {commentcount: --(thisessaycommentcount.commentcount)}, function (commentcounterr, essayObject) {
                    if (commentcounterr) {
                        req.flash('error', commentcounterr);
                        return res.redirect('/Essay/showessay/' + req.session.essay._id);
                    }
                    console.log('##########' + essayUsername);
                    console.log('**************' + essayCaption);
                    mongoose.model('EssayPost').findOne({
                        username: essayUsername,
                        caption: essayCaption
                    }, function (essayErr, findIdByUserCaption) {
                        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&' + findIdByUserCaption);
                        if (delComerr) {
                            req.flash('error', delComerr);
                            return res.redirect('/Essay/showessay/' + findIdByUserCaption._id);
                        }
                        return res.redirect('/Essay/showessay/' + findIdByUserCaption._id);
                    });
                });
            });
        });
    });
}
