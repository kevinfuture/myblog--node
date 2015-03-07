/**
 * Created by kevin on 2015/3/2/0019.
 */
//mongoose模块使用
var db = require('../models/db');
var baseObject = require('../models/BaseObject');
var User = require('../models/User');
var Schema = db.mongoose.Schema;
var ObjectId =Schema.Types.ObjectId;
var CommentSchema = new Schema({
    username:String,
    caption:String,//逻辑判断是否是一个人的标题，同一个人不允许出现相同内容的标题
    commentUser:String,//评论人
    commentContent:String,//评论内容
    baseObj:{type:Array,default:baseObject.BaseObject.call(this)}
});
exports.Comment = db.mongoose.model('Comment',CommentSchema) ;
