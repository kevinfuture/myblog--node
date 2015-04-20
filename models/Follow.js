/**
 * Created by kevin on 2015/2/19/0019.
 */
//mongoose模块使用
var db = require('../models/db');
var baseObject = require('../models/BaseObject');
var Schema = db.mongoose.Schema;
var ObjectId =Schema.Types.ObjectId;
var FollowSchema = new Schema({
    whofollowname:{type:String,index: true},//此处我设置了name为唯一性的索引，它自动指向数据文档的_id，所以我可以不用设置_id
    followwhoname:String,
    baseObj:{type:Array,default:baseObject.BaseObject.call(this)}
});
FollowSchema.methods.find = function (whofollowname, callback) {
    return this.find({ whofollowname: whofollowname }, callback);
}
// Middleware...
FollowSchema.static('authed', function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
})

FollowSchema.static('exists', function (whofollowname, cb) {
    FollowSchema.findOne({ whofollowname: whofollowname }, function(err, whofollow) {
        if (whofollow) return cb(true);
        return cb(false);
    });
})
FollowSchema.static('findOrCreate', function (query, cb) {
    FollowSchema.findOne(query, function (err, doc) {
        if (err) return cb(err)
        else if (!doc) FollowSchema.create(query, cb)
        else cb(null, doc)
    })
})
exports.Follow = db.mongoose.model('Follow',FollowSchema) ;
