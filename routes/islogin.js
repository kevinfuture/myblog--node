/**
 * Created by kevin on 2015/2/19/0019.
 */
var express = require('express');
var router = express.Router();

//判断是否登录模块
function islogin() {
    this.checkLogin=function(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登入');
            return res.redirect('/login');
        }
        next();
    }

    this.checkNotLogin=function(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登入');
            return res.redirect('/');
        }
        next();//进入下一层，验证信息
    }
}


module.exports = islogin;//这里没有暴露出来