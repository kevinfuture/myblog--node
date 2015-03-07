var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CommentSchema = require('../../../models/Comment.js');

/* GET home page. */
router.post('/Essay/comment/:_id?', function(req, res, next) {
    if(!req.session.user)
    { req.flash('error', '请登录后评论！！！');
        return res.redirect('/login');
    }
    mongoose.model('Comment').count({_id: req.params._id}, function (err, comment) {
        if (!comment) {
            var newComment = new CommentSchema.Comment({
                username: req.session.essay.username,//这里要取得参数
                caption: req.session.essay.caption,
                commentuser: req.session.user.name,
                commentContent: req.body.commentContent
            });
            newComment.save(function (err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/Essay/showessay');
                }
                req.flash('success', '评论成功！！！');
                res.render('Blog/Essay/showessay', {
                    essay: req.session.essay
                });
            });
        } else {
            mongoose.model('Comment').findOneAndUpdate({_id: req.params._id}, {commentContent: req.body.commentContent}, function (err, comment) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/Essay/showessay');
                }
                return res.redirect('/Essay/showessay');
            });
        }
    });
});

module.exports = router;
