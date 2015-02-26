/**
 * Created by kevin on 2015/2/19/0019.
 */
//mongoose模块使用
var db = require('../models/db');
var baseObject = require('../models/BaseObject');
var Schema = db.mongoose.Schema;
var ObjectId =Schema.Types.ObjectId;//注意写法，大小写要正确，最好使用webstorm的自动补全，这样可以定位到相应的模块代码
var UserSchema = new Schema({
    //id:{type:ObjectId,default:null},//此处的id并不是mongodb中的“_id”，是自定义的id，其中设置ObjectId有困难,但是可以取出_id
    name:{type:String,index: true},//此处我设置了name为唯一性的索引，它自动指向数据文档的_id，所以我可以不用设置_id
    password:String,
    baseObj:{type:Array,default:baseObject.BaseObject.call(this)}//这样就可以直接从BaseObject获取基本数据了，只是这种方法还有待改善，这不是继承上层的东西
    //当然还有一种是用中间件的方法（mongoose-schema-extend）参考网址 ：http://my.oschina.net/antianlu/blog/187316
});
UserSchema.methods.find = function (username, callback) {
   return this.find({ username: username }, callback);
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
// How-to: User.findOrCreate({google_id: identification}, function (er, user) {})Used for any passport 3rd party auth needs
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
