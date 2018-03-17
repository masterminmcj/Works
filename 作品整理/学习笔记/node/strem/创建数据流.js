/**
 * Created by mastermin on 17-6-17.
 */
var fs=require("fs");
var readStrem=fs.createReadStream("../video/mv1.mp4");//读取视频
var times=0;//初始计时为0
var date=new Date();
date1=date.getTime();//获取读取前时间
readStrem.toString("utf8");

readStrem
.on("data",function(chunk){

    //console.log(Buffer.isBuffer(chunk));
   // console.log(chunk.toString());

readStrem.pause();//暂停流
setTimeout(function(){
    readStrem.resume()//恢复流
},10)

})
.on("readable",function(){//正在读取时数据信息
})
.on("end",function(){
    var Dates=new Date();

    var date2=Dates.getTime();//获取读取完成后时间

    var readtimes=date2-date1;//得到读取时间
    console.log("读取成功");

    console.log("读取时间为:"+readtimes+"毫秒")
})
.on("error",function(){
    console.log("读取失败")
});