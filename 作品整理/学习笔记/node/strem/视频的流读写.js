/**
 * Created by mastermin on 17-6-17.
 */
var fs=require("fs");
var readStrem=fs.createReadStream('../video/mv1.mp4');//创建只读流
var writeStrem=fs.createWriteStream('../video/mv1_copy.mp4');//创建只写流
var times=0;//初始计时为0
var date=new Date();
date1=date.getTime();//获取读取前时间
readStrem
    .on("data",function(chunk){
        //检测此块的数据是否已经完全写入了写入文件中
        //这个判断是必要的防止读写速度差距过大
       if(writeStrem.write(chunk)===false){
           readStrem.pause();//若未完全写入则停止传输等待写入完毕
       }
    })
    .on("end",function(){
        var Dates=new Date();
        var date2=Dates.getTime();//获取读取完成后时间
        var readtimes=date2-date1;//得到读取时间
   console.log("视频传输完毕!");
        console.log("视频传输时间为:"+readtimes)
});
//drain事件监听某块的数据是否完全写入，若完全写入则触发该事件
writeStrem.on("drain",function(){
   readStrem.resume();//恢复流
})

