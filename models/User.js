/**
 * Created by kevin on 2015/2/19/0019.
 */
//mongoose模块使用
var db = require('../models/db');
var Schema = db.mongoose.Schema;
var ObjectId =Schema.Types.ObjectId;//注意写法，大小写要正确，最好使用webstorm的自动补全，这样可以定位到相应的模块代码
var UserSchema = new Schema({
   // _id:ObjectId,
    name:{type:String,index: true},
    password:String
});
UserSchema.method.find = function (username, callback) {
    this.find({ username: username }, callback);
}
// Middleware...
UserSchema.static('authed', function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
})

UserSchema.static('exists', function (username, cb) {
    UserSchema.findOne({ username: username }, function(err, user) {
        if (user) return cb(true);
        return cb(false);
    });
})

// Used for any passport 3rd party auth needs.
// How-to: User.findOrCreate({google_id: identification}, function (er, user) {})
UserSchema.static('findOrCreate', function (query, cb) {
    UserSchema.findOne(query, function (err, doc) {
        if (err) return cb(err)
        else if (!doc) UserSchema.create(query, cb)
        else cb(null, doc)
    })
})
//UserSchema.pre('save',function(user,callback){
    //var user = {
    //    name : this.name,
    //    //email : this.email,
    //    password : this.password
    //};
    //this.insert(user,{safe:true},function(err){//有错误
    //    callback();
    //});

//})
exports.User = db.mongoose.model('User',UserSchema) ;


/*   mongodb模块的使用
 var mongodb = require('./db');
 //未获取BaseObject中的字段
 function User(user){
 this.name = user.name;
 // this.email = user.email;
 this.password = user.password;
 };
 User.get = function get(username,callback){
 mongodb.open(function(err,db){
 if(err){
 return callback(err);
 }
 db.collection('user',function(err,collection){
 if(err){
 mongodb.close();
 return callback(err);
 }
 collection.findOne({name:username},function(err,doc){
 mongodb.close();
 if(doc){
 var user = new User(doc);
 callback(err,user);
 }else{
 callback(err,null);
 }
 });
 })
 });
 }

 User.prototype.save = function save(callback){
 var user = {
 name : this.name,
 //email : this.email,
 password : this.password
 };
 mongodb.open(function(err,db){
 if(err){
 return callback(err);
 }
 db.collection('user',function(err,collection){
 if(err){
 mongodb.close()
 return callback(err);
 }
 collection.ensureIndex('name',{unique:true},function(err,user){});//mongodb支持索引，所以在这里给name设置所以可以提高查询速度
 collection.insert(user,{safe:true},function(err){
 mongodb.close();
 callback();
 });
 })
 });
 }
 module.exports = User;
 */