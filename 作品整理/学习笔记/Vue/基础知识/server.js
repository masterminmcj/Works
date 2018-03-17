var http=require('http');


var server=http.createServer(function (req,res) {

res.writeHead(200,{"Access-Control-Allow-Credentials":true});
    res.write('hello');
    res.end()
});
server.listen(8085);
