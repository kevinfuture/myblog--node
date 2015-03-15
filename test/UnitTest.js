/**
 * Created by kevin on 2015/2/19/0019.
 */
var express = require('express');
var router = express.Router();
var islogin = require('../routes/islogin');

var isLogin = new islogin();

isLogin.log();