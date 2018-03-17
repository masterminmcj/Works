/**
 * Created by mastermin on 17-6-28.
 */

//本例获取来自class_1所创建的响应的数据

var http=require("http");
var options={
    hostname:'localhost',
    port:3004,
    path:'/',
    method:"post"
};

var req=http.request(options,function(res){
    res.on("data",function(chunk){
        console.log(chunk.toString("utf8"))//这是第一个页面
    });

});

req.on("error",function(){
    console.log("error")
});
req.end();