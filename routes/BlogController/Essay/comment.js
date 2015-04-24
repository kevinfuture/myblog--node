var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var CommentSchema = require('../../../models/Comment.js');

/* GET home page. */
router.get('/Essay/comment/:_id?', function(req, res, next) {
        mongoose.model('Comment').findOne({_id: req.params._id||req.query._id}, function (err, currentcomment) {
            console.log('currentcomment:' + currentcomment);
            mongoose.model('EssayPost').findOne({username:currentcomment.username,caption:currentcomment.caption},function(err,essay) {
                req.session.essay = essay;
            mongoose.model('Comment').find({username:essay.username,caption:essay.caption},function(err,commentlist) {
                commentlist.forEach(function(value,index,array){
                    array[index].baseObj[0].Date=moment(array[index].baseObj[0].Date).format();
                });
                if (!req.session.user || req.session.user.name != essay.username)//如果只要求有用户进行登录时候浏览的话才增加“阅读”次数，那么就把||前边的条件去掉
                {
                    mongoose.model('EssayPost').findOneAndUpdate({_id: req.params._id}, {browsercount: ++(essay.browsercount)}, function (err, essay) {
                        if (err) {
                            req.flash('error', err);
                            return res.redirect('/');
                        }
                    });
                }
                res.render('Blog/Essay/showessay', {
                    commentContent:currentcomment==null?'没有':currentcomment.commentContent,
                    essay: essay,
                    comment:commentlist,
                    funscount: req.session.funscount == null ? 0 : req.session.funscount,
                    followcount: req.session.followcount == null ? 0 : req.session.funscount,
                    follow1:req.session.follow1==null?null:req.session.follow1,
                    follow2:req.session.follow2==null?null:req.session.follow2,
                    follow3:req.session.follow3==null?null:req.session.follow3,
                    newUserList:req.session.newUserList==null?null:req.session.newUserList
                });
            });
        });
    });
});


router.post('/Essay/comment/:_id?', function(req, res, next) {
    if(!req.session.user)
    { req.flash('error', '╮(╯﹏╰)╭，还没有登录—然后评论');
        return res.redirect('/login');
    }
    mongoose.model('EssayPost').findOne({username:req.session.essay.username,caption:req.session.essay.caption},function(err,thisessaycommentcount) {
        mongoose.model('Comment').count({_id: req.session.essay._id}, function (err, commentObj) {
            console.log('dayinchu#####:'+thisessaycommentcount);
            if (!commentObj) {
                mongoose.model('EssayPost').findOneAndUpdate({username:req.session.essay.username,caption:req.session.essay.caption},{commentcount:++(thisessaycommentcount.commentcount)}, function (commentcounterr, essayObject) {
                    if(commentcounterr){
                        req.flash('error',commentcounterr);
                        return res.redirect('/Essay/showessay/'+req.session.essay._id);
                    }
                var newComment = new CommentSchema.Comment({
                    username: req.session.essay.username,//这里要取得参数
                    caption: req.session.essay.caption,
                    commentUser: req.session.user.name,
                    commentContent: req.body.commentContent,
                    commentcount:1
                });
                newComment.save(function (err) {
                    if (err) {
                        req.flash('error', err);
                        return res.redirect('/Essay/showessay/'+req.session.essay._id);
                    }
                    req.flash('success', 'O(∩_∩)O哈哈~评论成功！！！');
                    mongoose.model('Comment').find({
                        username: req.session.essay.username,
                        caption: req.session.essay.caption
                    }, function (err, commentlist) {
                            //res.render('Blog/Essay/showessay', {
                            //    commentContent: null,
                            //    essay: req.session.essay,
                            //    comment: commentlist
                            //});
                        return res.redirect('/Essay/showessay/'+req.session.essay._id);
                        });
                    });
                });
            } else {
                mongoose.model('Comment').findOneAndUpdate({_id: req.params._id}, {commentContent: req.body.commentContent,commentcount:++(thisessaycommentcount.commentContent)}, function (err, comment) {
                    if (err) {
                        req.flash('error', err);
                        return res.redirect('/Essay/showessay');
                    }
                    return res.redirect('/Essay/showessay');
                });
            }
        });
    });
});

module.exports = router;
