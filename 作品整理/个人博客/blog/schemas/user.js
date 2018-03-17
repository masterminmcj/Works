/**
 * Created by mastermin on 17-9-17.
 */
var mongoose=require('mongoose');
//创建数据库模型，并暴露出去
module.exports=new mongoose.Schema({
    username:String,
    phonenumber:Number,
    password:String,

    //判断是否为管理员
    isAdmin: {
        type:Boolean,
        default:false
    }
});
