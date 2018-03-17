/**
 * Created by mastermin on 17-7-3.
 */

//提交数据至mysql中,配合表单提交.html共同使用


var http=require("http");
var mysql=require("mysql");

var r_data=[];

var connection=mysql.createConnection({
   host:"localhost",
    user:"root",
    password:"mcj19960329",
    database:"Test2"
});



var server=http.createServer(function(req,res){

    req.on("data",function(data){
        r_data=decodeURIComponent(data).split("&");//解码成字符串
    });
    req.on("end",function(){
        var username=r_data[0].split("=")[1].trim();//从提交的信息中得到用户名
        connection.connect();

        var sql="select * from tb2";
        var sql="insert tb2(name) values("+"'"+username+"'"+")";//编写sql语句

        connection.query(sql,function(err,result){
            if(err){
                console.log("error")
            }
            else {
                console.log(result)
            }

        });
        connection.end();
});

    res.writeHeader(200,{"Content-Type":"text/html;charset='utf8'"});
    res.write("<p style='height:45px;color: black;font-size: 30px;background-color: #00FF00;line-height: 45px'>" +
        "数据保存成功!</p>");
    res.end();









});

server.listen(8081);