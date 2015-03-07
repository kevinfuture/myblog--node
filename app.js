var express = require('express');//PS：4.x将中间件分离了出来，所以如果想要使用哪个模块就需要自己手动npm install
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//引入模块
var ueditor = require("ueditor");
var moment = require('moment');
//引入eventproxy模块用来解决异步嵌套回调问题
var EventProxy = require('eventproxy');//还没有使用


var setting = require('./setting');
//import sessions Persistence modules
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


var routes = require('./routes/index');
var users = require('./routes/users');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');
//修改密码---确认旧密码
var confirmsecret = require('./routes/confirmsecret');
//修改密码---输入域新密码
var modifysecret = require('./routes/modifysecret');
//跳转页面
var skipmiddle = require('./routes/skipmiddle');
//以下是正式进入博客园的文件
var blogindex= require('./routes/BlogController/index');

//随笔的控制层
var newessay= require('./routes/BlogController/Essay/newessay');
var essaylist= require('./routes/BlogController/Essay/essaylist');
var showessay= require('./routes/BlogController/Essay/showessay');

//相册的控制层
var photo= require('./routes/BlogController/Album/photo');


//文件上传的控制层
var uploadfile= require('./routes/BlogController/File/uploadfile');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());//app.use(express.cookieParser()); 3.x
app.use(express.static(path.join(__dirname, 'public')));

//show use flash modules
app.use(flash());
//引入session连接mongodb
app.use(session({
    secret: setting.cookieSecret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        db: setting.db
    }, function() {
        console.log('connect mongodb success...');
    })
}));
//注意，这里是用来把flash的中间键的标记如success等加载进去
app.use(function(req, res, next){
    console.log("app.usr local");
    res.locals.user = req.session.user;
    res.locals.post = req.session.post;
    var error = req.flash('error');
    res.locals.error = error.length ? error : null;

    var success = req.flash('success');
    res.locals.success = success.length ? success : null;
    next();
});


app.use('/', routes);
app.get('/users',users);
app.post('/users',users);
app.get('/reg',reg);
app.post('/reg',reg);
app.get('/login',login);
app.post('/login',login);
app.get('/logout',logout);
//确认旧密码路由指向
app.get('/confirmsecret',confirmsecret);
app.post('/confirmsecret',confirmsecret);
//输入新密码路由指向
app.get('/modifysecret',modifysecret);
app.post('/modifysecret',modifysecret);
//跳转路由指向
app.get('/skipmiddle',skipmiddle); 
//以下是博客园的路由指向
app.get('/:users?/:calenderdate?',blogindex);
//随笔的路由指向
app.get('/Essay/newessay/:_id?',newessay);
app.post('/Essay/newessay',newessay);
app.get('/:user?/Essay/essaylist',essaylist);
app.get('/Essay/showessay/:username?/:caption?',showessay);

//相册的路由指向
app.get('/Album/photo',photo);

//文件的路由指向
app.get('/File/uploadfile',uploadfile);


//ueditor的图片存放路径的路由代码
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/images/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));
app.use('/', function(req, res) {
    res.render('ueditor');
});
//到这里结束

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
