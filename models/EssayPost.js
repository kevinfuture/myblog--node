/**
 * Created by kevin on 2015/3/2/0019.
 */
//mongoose模块使用
var db = require('../models/db');
var baseObject = require('../models/BaseObject');
var User = require('../models/User');
var Schema = db.mongoose.Schema;
var ObjectId =Schema.Types.ObjectId;
var EssayPostSchema = new Schema({
    username:String,
    caption:{type:String,default:'请输入标题',index: true},//逻辑判断是否是一个人的标题，同一个人不允许出现相同内容的标题
    content:String,
    TDate:String,
    browsercount:{type:Number,default:0},
    commentcount:{type:Number,default:0},
    baseObj:{type:Array,default:baseObject.BaseObject.call(this)}
});
//EssayPostSchema.methods.find = function (_id, callback) {
//    return this.find({ _id: _id }, callback);
//}
exports.EssayPost = db.mongoose.model('EssayPost',EssayPostSchema) ;
