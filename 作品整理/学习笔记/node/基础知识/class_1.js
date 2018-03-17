/**
 * Created by mastermin on 17-6-28.
 */
var http=require("http");
var url=require("url");
http.createServer(function(req,res){
    //编写响应头,并指定页面编码方式
    res.writeHeader(200,{"Content-Type":"text/html;charset='utf8'"});
   // console.log(req.headers)//输出请求头
    console.log(url.parse(req.url).pathname);
    res.write("这是第一个页面");
    res.end();
}).listen(3004);