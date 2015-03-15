/**
 * Created by kevin on 2015/2/19/0019.
 */
//mongoose模块使用
var db = require('../models/db');
var baseObject = require('../models/BaseObject');
var Schema = db.mongoose.Schema;
var ObjectId =Schema.Types.ObjectId;
var UserSchema = new Schema({
    name:{type:String,index: true},//此处我设置了name为唯一性的索引，它自动指向数据文档的_id，所以我可以不用设置_id
    password:String,
    tel:String,
    email:String,
    age:String,
    baseObj:{type:Array,default:baseObject.BaseObject.call(this)}
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
exports.User = db.mongoose.model('User',UserSchema) ;
