/**
 * Created by mastermin on 17-7-3.
 */
 var fs=require('fs');
 var http=require("http");
 var mysql=require("mysql");


 var mess={
   name:"张三",
     age:22,
     sex:"男",
     job:"策划经理",
     company:"阿里巴巴"
 };

 var server=http.createServer(function(req,res){
     res.writeHeader(200,{"Content-Type":"text/html;charset='utf8'"});
     res.end(mess)
 });

 server.listen(8082);
