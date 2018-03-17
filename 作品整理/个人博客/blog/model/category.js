/**
 * Created by mastermin on 17-9-17.
 */
//建立数据模型
var mongoose=require('mongoose');
var categorySchmas=require('../schemas/category');
module.exports=mongoose.model('category',categorySchmas);
