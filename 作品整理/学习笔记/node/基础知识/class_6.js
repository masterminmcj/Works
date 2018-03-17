/**
 * Created by mastermin on 17-6-29.
 */
//发送一张图片至网页
var fs=require("fs");
var http=require("http");

http.createServer(function(req,res){
    res.writeHeader(200,{"Content":"text/html"});
 fs.createReadStream("./test/a2.jpg").pipe(res);

}).listen(3008);


