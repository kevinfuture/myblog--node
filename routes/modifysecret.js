var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var crypto = require('crypto');
var islogin = require('../routes/islogin');

/* GET home page. */
router.get('/modifysecret', function(req, res, next) {
    res.render('modifysecret', { title: '新密码' });
});


router.post('/modifysecret', function(req, res, next) {
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '两次输入的口令不一致');
        return res.redirect('/reg');
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    mongoose.model('User').findOneAndUpdate({name:req.session.user.name},{password:password}, function(err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/modifysecret');
        }
        delete req.session.user;//这里对session进行修改就完成了session的匹配，实时的session更新
        res.redirect('/skipmiddle');
    });
});
module.exports = router;
