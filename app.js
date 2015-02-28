var express = require('express');//PS：4.x将中间件分离了出来，所以如果想要使用哪个模块就需要自己手动npm install
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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
//以下是正式进入博客园的文件
var blogindex= require('./routes/BlogController/index');

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
//以下是博客园的路由指向
app.get('/Blog/index',blogindex);



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
