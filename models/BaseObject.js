var db = require('../models/db');
var Schema = db.mongoose.Schema;
var ObjectId =Schema.Types.ObjectId;//注意写法，大小写要正确，最好使用webstorm的自动补全，这样可以定位到相应的模块代码

var BaseObjecSchema = new Schema({
    // _id:ObjectId,默认有_id所以我不用创建_id，如果要用_id的话可以使用索引index：true，有种写法是这样的但是没有成功id:{type:ObjectId,default:function(){return new ObjectId;}}
    IsDelete:{type:Boolean,default:false},
    //Version:String,  在mongodb中已经自动创建了_v所以此处省略了
    Entity:{type:String,default:'Entity'},//没有用过
    Date:{type:Date,default:Date.now()}
} ,{ _id: false, autoIndex: false });//禁止自动创建_id跟索引
exports.BaseObject = db.mongoose.model('BaseObject',BaseObjecSchema) ;
