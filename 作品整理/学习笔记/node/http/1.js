
var http=require("http");
var url='http://www.baidu.com';
var html="";
http.request(url,function(req,res) {

    res.on("data", function (datas) {
        html += datas;
        console.log(html);
    })

    r
});

