/**
 * Created by mastermin on 17-10-2.
 */
//建立数据模型
var mongoose=require('mongoose');
var contentSchmas=require('../schemas/blogPublish');
module.exports=mongoose.model('blogContent',contentSchmas);
