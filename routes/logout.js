/**
 * Created by kevin on 2015/2/20/0020.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var islogin = require('../routes/islogin');


//创建对象
var isLogin = new islogin();


router.get('/logout', isLogin.checkLogin);
router.get('/logout', function(req, res) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/');
});

module.exports = router;