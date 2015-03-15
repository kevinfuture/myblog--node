/**
 * Created by kevin on 2015/2/18/0018.
 */
//使用mongoose连接数据库
//导入要连接的模块文件setting.js
var setting = require("../setting");
//获取数据对象
var mongoose = require("mongoose");
//使用了mongoose模块创建连接
var Connections = mongoose.connect('mongodb://'+setting.host+'/'+setting.db);
//创建连接并且将接口exports出来
exports.mongoose = mongoose;//注意这里已经使用exports.mongoose=mongoose代替了module.exports =mongoose,这个在nodejs开发指南上帝44页左右已经有提过
