/**
 * Created by mastermin on 17-6-17.
 */

var fs=require("fs");
var http=require("http");
var request=require("request");
var server=http.createServer(function(req,res){

   /*一般做法
   fs.readFile('../test/pic6.jpg',"utf8",function(err,data){
       if(err){
           console.end("读取的图片不存在")
       }
else {
           res.writeHeader(200,{"Content-Type":"text/html"});
           res.end(data);
       }
   }) ;
   */
   //使用pipe更为高效
  fs.createReadStream("../test/pic6.jpg").pipe(res)

    //使用request直接从网站中边下载边显示图片
//request("http://www.imooc.com/static/img/landp_banner.jpg").pipe(res)
});
server.listen(3001);
