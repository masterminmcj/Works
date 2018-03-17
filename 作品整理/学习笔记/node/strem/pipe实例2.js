/**
 * Created by mastermin on 17-6-18.
 */
var readble=require("stream").Readable;
var writeble=require("stream").Writable;

var readStrem=new readble();
var writeStrem=new writeble();

var buf=Buffer.from("hello wrold",'utf8');

readStrem.push(buf);//字符串或Buffer
readStrem.push(null);

writeStrem.write=function(chunk,encode,callback){
  console.log(chunk.toString())
};

readStrem.pipe(writeStrem);//连接可读流和可写流
