/**
 * Created by mastermin on 17-6-28.
 */
//Buffer
//不需要用require引入


    //1(已废弃)
    //new Buffer(size||string)
var buf1=new Buffer(5);
buf1.write("abcdefg");
var buf2=new Buffer("123abc");

//2,新版(推荐使用)
//Buffer.from(string,[encoding])&Buffer.from(buffer)拷贝已有的buffer
//Buffer.alloc(size,[fill],[encoding])
var buf3=Buffer.from("4444aaa");
var buf5=Buffer.from(buf2);
var buf4=Buffer.alloc(5);
buf4.write("11111111111");//超过初始长度自动舍弃

//Buffer.isBuffer判断是否为buffer
var is_buf=Buffer.isBuffer(buf4);

console.log(buf3.toString("utf8"));
console.log(buf5.toString("utf8"));
console.log(is_buf)//true