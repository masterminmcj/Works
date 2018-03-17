/**
 * Created by mastermin on 17-6-29.
 */
//文件的读写及流
var fs=require("fs");
var strem=require("stream");


//通过文件读写实现
fs.readFile("./test/test1.txt","utf8",function(err,data){
   if(err){
       console.log("读取失败")
   }
   else {
       console.log(data);
       fs.writeFile("test/test1_copy.txt",data,function(err){
           if(err){
               console.log("写入文本失败")
           }
       })
   }
});
//通过流实现
var reads=fs.createReadStream("./test/test1.txt");//创建只读流
var writes=fs.createWriteStream("./test/test1_copy1");//创建只写流
reads.pipe(writes);//通过管道传输