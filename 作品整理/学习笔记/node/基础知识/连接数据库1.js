/**
 * Created by mastermin on 17-6-28.
 */
var mysql=require("mysql");
//定义连接前信息
var connection=mysql.createConnection({
host:"localhost",
user:"root",
    password:"mcj19960329",
    database:"Test2"
});
connection.connect();//连接数据库
var sql="select * from tb1";//操作数据表指令
connection.query(sql,function(err,result){
    if(err){
        console.log("查询失败!")
    }
    else {
        for (var x of result) {

            console.log("------------------------");
            console.log(x.name);//打印查找结果

        }
    }
});
connection.end();