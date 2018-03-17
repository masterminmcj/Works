/**
 * Created by mastermin on 17-6-12.
 */


var http=require("http");
var querystring=require("querystring");

var CommentContent=querystring.stringify({
    "content":"老师棒棒哒!",
"mid":8927
});
var options={
   hostname:"www.imooc.com",
   port:80,
   path:"/course/docomment",
   method:"POST",
  headers:{
 "Accept":"application/json, text/javascript, */*; q=0.01",
 "Accept-Encoding":"gzip, deflate",
 "Accept-Language":"zh-CN,zh;q=0.8",
 "Connection":"keep-alive",
 "Content-Length":CommentContent.length,
 "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
 "Cookie":"imooc_uuid=6861e797-5b04-449a-8cec-a3df1395d986; imooc_isnew_ct=1496719706; loginstate=1; apsid=UwZjBjM2JiMGRiZTdlY2ZjM2EwOTlmYzRhODE0NTQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzI4MDMxOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMzI3ODYxNTgwQHFxLmNvbQAAAAAAAAAAAAAAAAAAADY4YTc5MjQ3ZWM1ZTk3NWYzODkzNTM5ZGI3YjliOWQwtSE2WbUhNlk%3DMD; last_login_username=1327861580%40qq.com; PHPSESSID=u3uict31obnpco6j69s8m63tn5; channel=491b6f5ab9637e8f6dffbbdd8806db9b_phpkecheng; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1497189922,1497191222,1497279946,1497339900; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1497345492; imooc_isnew=2; cvde=593f97f584375-176",
 "Host":"www.imooc.com",
 "Origin":"http://www.imooc.com",
 "Referer":"http://www.imooc.com/video/8927",
 "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
 "X-Requested-With":"XMLHttpRequest"
    }
};
var req=http.request(options,function(res){
   console.log("status:"+res.statusCode);
   console.log("header:"+JSON.stringify(res.headers));
   res.on("data",function(chunk){
       console.log(chunk)
   });
res.on("end",function(){
    console.log("评论成功");
});

});
req.on("error",function(){
    console.log("评论失败");
});
req.write(CommentContent);
req.end();