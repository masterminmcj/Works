/**
 * Created by mastermin on 17-10-2.
 */

var mongoose=require('mongoose');
//创建数据库模型，并暴露出去
module.exports=new mongoose.Schema({
  title:String,
  mainContent:String,
  timeStamp:String,
  author:String

});
