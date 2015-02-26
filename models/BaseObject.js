var db = require('../models/db');
var Schema = db.mongoose.Schema;
var ObjectId =Schema.Types.ObjectId;

var BaseObjecSchema = new Schema({//在mongodb中会按照相反的顺序排列
    Date:{type:Date,default:Date.now()},
    Entity:{type:Number,default:0},
    Version:{type:Number,default:1},
    IsDelete:{type:Boolean,default:false}
} ,{ _id: false, autoIndex: false });//禁止自动创建_id跟索引
exports.BaseObject = db.mongoose.model('BaseObject',BaseObjecSchema) ;
