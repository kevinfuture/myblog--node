var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET home page. */
router.get('/skipmiddle', function(req, res) {
    mongoose.model('User').find(function(err, user){
        res.render('skipmiddle');
    });
});

module.exports = router;
