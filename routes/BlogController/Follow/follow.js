var express = require('express');
var router = express();
var Follow = require('../../../models/Follow');


/* GET Follow page. */
module.exports = function(router) {
    router.get('/Follow', function (req, res) {
        if (!req.session.user) {
            req.flash('error', '╮(╯﹏╰)╭，还没有登录—');
            return res.redirect('/login');
        }
        var followwhoname = req.query.followwhoname,
            currentUser = req.session.user;
        if(followwhoname==currentUser.name)
        {
            req.flash('error', '╮(╯▽╰)╭，不能关注自己奥！！！');
            return res.redirect('/'+currentUser.name);
        }
        var newfuns = new Follow.Follow({
            whofollowname: currentUser.name,
            followwhoname: followwhoname
        });
        newfuns.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/'+followwhoname);
            }
        });
        return res.redirect('/'+followwhoname);
    });
}
