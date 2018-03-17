/**
 * Created by mastermin on 17-6-29.
 */

//本例实现通过在域名上输入文件名,访问展现不同文件
'use strict';
var path=require("path");
var http=require("http");
var url=require("url");
var fs=require("fs");

var resDir=path.resolve("./test");//获得test文件夹的绝对路径

console.log(resDir);

var server=http.createServer(function(req,res){

 var pathname=url.parse(req.url).pathname;//获得响应的路径注意响应的路径是以/开头,/表示主页,及localhost:xxxx

var filepath=path.join(resDir,pathname);//组合请求文件,得到这个文件的绝对路径
console.log(filepath);
fs.stat(filepath,function(err,stats){
//stat获得文件大小等消息
    if(!err&&stats.isFile()) {
        res.writeHead(200,{"Content-Type":"text/html;charset='utf8"});
        fs.createReadStream(filepath).pipe(res);
//res自带可写流

    }
    else {
        res.writeHead(400);//若无此文件返回404
        res.end("404 not found")
    }
});
});
server.listen(3007);


