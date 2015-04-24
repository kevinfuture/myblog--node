var express = require('express');
var router = express();
var mongoose = require('mongoose');
var Follow = require('../../../models/Follow');


/* GET Follow page. */
module.exports = function(router) {
    router.get('/DelFollow', function (req, res) {
        if (!req.session.user) {
            req.flash('error', '╮(╯﹏╰)╭，还没有登录—');
            return res.redirect('/login');
        }
        var followwhoname = req.query.followwhoname,
            currentUser = req.session.user;
        mongoose.model('Follow').remove({whofollowname:req.session.user.name,followwhoname:followwhoname}, function(err, Delfollow) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/'+followwhoname);

            }
            delete req.session.followObject;//这里对session进行修改就完成了session的匹配，实时的session更新
            return res.redirect('/'+followwhoname);
        });
    });
}
