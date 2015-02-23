/**
 * Created by kevin on 2015/2/18/0018.
 */


//导入要连接的模块文件setting.js
var setting = require("../setting");
//获取数据对象
var Db = require("mongodb").Db;//这里的require("mongodb").Db最后不能加()
//常规来说的创建连接
var Connections = require("mongodb").Connection;
//获取服务对象
var Server = require("mongodb").Server;
//创建连接并且将接口exports出来
module.exports = new Db(setting.db,new Server(setting.host,Connections.DEFAULT_PORT,{}),{safe:true});

