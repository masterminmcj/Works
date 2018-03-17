var http=require('http');



/*
var data="我是通过JSONP传输的";
var server=http.createServer(function (req,res){
var query=req.url.split('?')[1];

var jsonp=query.split('jsonp')[1].slice((1));
var ppp=jsonp+'("'+data.toString()+'")';
console.log(ppp)
    res.end(ppp)
});
server.listen('8081');

*/


var server=http.createServer(function(req,res){
    console.log(req.data);
    res.end()
});
server.listen(8081);


