/**
 * Created by mastermin on 17-9-17.
 */
//建立数据模型
var mongoose=require('mongoose');
var userSchmas=require('../schemas/user');
module.exports=mongoose.model('user',userSchmas);
