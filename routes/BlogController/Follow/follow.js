var express = require('express');
var router = express();
var Follow = require('../../../models/Follow');


/* GET Follow page. */
module.exports = function(router) {
    router.get('/Follow', function (req, res) {
        if (!req.session.user) {
            req.flash('error', '未登入');
            return res.redirect('/login');
        }
        var followwhoname = req.query.followwhoname,
            currentUser = req.session.user
        var newfuns = new Follow.Follow({
            whofollowname: currentUser.name,
            followwhoname: followwhoname
        });
        newfuns.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/'+currentUser.name);
            }
        });
        return res.redirect('/'+currentUser.name);
    });
}
