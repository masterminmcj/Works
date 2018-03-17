/**
 * Created by mastermin on 17-6-7.
 */
var util=require("util");
function obj1() {
    this.name="张三";
    this.age=18;
    this.sayname=function () {
        console.log("我是"+this.name)
    }
}
obj1.prototype.sayhello=function () {
  console.log("hello everyone")
};

function obj2() {
    this.name="李四";
    this.age=19;
  // obj1.call(this)
   // obj1.apply(this) this这里被篡改为指向obj1
    //js通过apply&call实现继承但不能继承protype构造的方法

}

util.inherits(obj2,obj1);
var obj=new obj2();
obj.sayname();

//obj.sayhello();
//until.inherits只能继承通过protype构造的函数

//原型继承
//obj2.prototype=new obj1()
