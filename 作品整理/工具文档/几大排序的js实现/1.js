function triangle(a,b,c){
    var cicle=[];
    for(var i=a;i>0;i--){
        for(var j=b;j>0;j--){
            for(var k=c;k>0;k--){
              if((Math.abs(i-j)<k)&&(i+j>k)){
                  cicle.push(i+j+k)
              }
            }
        }
    }
    if(cicle.length===0){
        return "不存在这样三角形"
    }
    else if(cicle.length===1){
        return cicle[0]
    }
    else {
        var max=cicle[0];
        for(var p=1;p<cicle.length;p++){
if(cicle[p]>max){
    var t=cicle[p];
    cicle[p]=max;
    max=t
}
        }
   return max
    }
}
var c=triangle(2,4,6);

console.log(c);


