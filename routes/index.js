var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

/* GET home page. */
router.get('/', function(req, res) {
    User.get(null, function(err, user) {
        if (err) {
            user = [];
        }
        res.render('index', {
            title: 'index',
            user : req.session.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    });
});

module.exports = router;
