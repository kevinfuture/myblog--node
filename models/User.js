/**
 * Created by kevin on 2015/2/19/0019.
 */
var mongodb = require('./db');
//未获取BaseObject中的字段
function User(user){
    this.name = user.name;
   // this.email = user.email;
    this.password = user.password;
};
User.get = function get(username,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('user',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name:username},function(err,doc){
                mongodb.close();
                if(doc){
                    var user = new User(doc);
                    callback(err,user);
                }else{
                    callback(err,null);
                }
            });
        })
    });
}

User.prototype.save = function save(callback){
    var user = {
        name : this.name,
        //email : this.email,
        password : this.password
    };
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('user',function(err,collection){
            if(err){
                mongodb.close()
                return callback(err);
            }
            collection.ensureIndex('name',{unique:true},function(err,user){});//mongodb支持索引，所以在这里给name设置所以可以提高查询速度
            collection.insert(user,{safe:true},function(err){
                mongodb.close();
                callback();
            });
        })
    });
}
module.exports = User;