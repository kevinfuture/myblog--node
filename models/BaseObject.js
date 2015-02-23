/**
 * Created by kevin on 2015/2/20/0020.
 */
var mongodb = require('./db');

//注意这里还有错误，因为_id是ObjectId的类型，所以要封装一下

function BaseObject(baseObject){
    this.IsDelete = baseObject.IsDelete;
    this.Version = baseObject.Version;
    this.Entity = baseObject.Entity;
    this.IsDelete=function(){
        this.IsDelete=false;
    }
}
BaseObject.get = function(username,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('BaseObject',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({_id:uid},function(err,doc){
                mongodb.close();
                if(doc){
                    var baseObject = new BaseObject(doc);
                    callback(err,user);
                }else{
                    callback(err,null);
                }
            });
        })
    });
}

module.exports = BaseObject;

User.prototype.save = function save(callback){
    var baseObject = {
        IsDelete : this.IsDelete,
        Version : this.Version,
        Entity : this.Entity
    };
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('BaseObject',function(err,collection){
            if(err){
                mongodb.close()
                return callback(err);
            }
            collection.ensureIndex('_id',{unique:true});//mongodb支持索引，所以在这里给name设置所以可以提高查询速度
            collection.insert(baseObject,{safe:true},function(err){
                mongodb.close();
                callback();
            });
        })
    });
}