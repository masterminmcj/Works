/**
 * Created by mastermin on 17-11-6.
 */

var http=require('http');
var fs=require('fs');

var server=http.createServer(function(req,res) {
   if(req.url==='/'){

fs.readFile('./1.html',function(err,data){
 if(err){
    console.log('文件读取失败')
 return
 }

 else {

     res.writeHead(200,{"Content-Type":"text/html"});
     res.write(data);
     res.end()
 }
})
   }
    else {
       res.write('404 not found') ;
       res.end()
   }
});

server.listen(3007);

var io=require('socket.io').listen(server);//加入socket模块,并绑定到服务器
//引入socket处理模块
var count=0;//用于实时显示用户在线数量
io.sockets.on('connection',function(scoket) {
    console.log('已有用户连接了');
    count++;
    scoket.emit('message',{text:'mastermin',count:count});


    scoket.on('disconnect',function () {
        count--;
        console.log('当前用户数量为:'+count);
        io.emit('message',{text:'mastermin',count:count});
    console.log('用户已断开连接了')
    });


    console.log('当前用户数量为:'+count)
});




