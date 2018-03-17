/**
 * Created by mastermin on 17-7-13.
 */
$(".l_t").hide();



$(".nav_item>a").mouseover(function(e) {
    e=e||window.e;

    ($(e.target).next().show(500))
});

$(".nav_item>a").mouseout(function(e) {
    e=e||window.e;

    ($(e.target).next().hide(500))
});

//canvas
var ctx=document.getElementById("cans").getContext("2d");


var x=30;
var y=100;
var a=0;
var color='red';
function draw(){
ctx.beginPath();
ctx.moveTo(x,y);
x+=10;
y=y-Math.sin(x+a)*50;
ctx.lineTo(x,y);
ctx.lineWidth=8;
ctx.strokeStyle=color;
ctx.stroke();
ctx.closePath();
if(x>=300){
    a+=180;
    if(a==180){
        ctx.clearRect(0,0,300,300);
        x=30;
        y=100;
        color="green";
    }
    else {
        ctx.clearRect(0,0,300,300);
        x=30;
        y=100;
        a=0;
        color="red"
    }
}
}
var timer=setInterval(draw,100);

$('#loginout').on('click',function(e){
    e=e||window.e;
    e.preventDefault();
   $.ajax({
       url:'/api/user/loginout',
       success:function(res){
           if(res.isLoginout){
               window.location.reload()
           }

       }
   })

});