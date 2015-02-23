var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
/* GET users listing. */
router.get('/u/:user', function(req, res) {
    User.get(req.params.user, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/');
        }
        //Post.get(user.name, function(err, posts) {还没有做页面提交
        //    if (err) {
        //        req.flash('error', err);
        //        return res.redirect('/');
        //    }
        //    res.render('user', {
        //        title: user.name,
        //        posts: posts
        //    });
        //});
    });
});

module.exports = router;