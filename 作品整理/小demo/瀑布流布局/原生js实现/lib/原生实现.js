/**
 * Created by mastermin on 17-8-3.
 */
;
'use strict';
window.onload=function(){
    document.body.scrollTop=0;
  var pic_mess=[
      {'src':'40.jpg'},
      {'src':'41.jpg'},
      {'src':'42.jpg'},
      {'src':'43.jpg'},
      {'src':'44.jpg'},
      {'src':'45.jpg'},
      {'src':'46.jpg'},
      {'src':'47.jpg'},
      {'src':'48.jpg'},
      {'src':'49.jpg'},
      {'src':'50.jpg'}
      ];
  pic_sort(6);


document.onscroll=function() {
    if (promise_scroll()) {
        scroll_load(pic_mess);
    }


}
};



function pic_sort(num){
    //指定每行要显示的图片数量,确定continer的宽度
    var picW=document.querySelectorAll('.box')[0].offsetWidth;
    document.querySelectorAll('.container')[0].style='width:'+num*picW+'px';
    //实现图片的排列
     var minH=[];
     var pic_HS=document.querySelectorAll('.box');
     for(var i=0;i<num;i++){
         minH.push(pic_HS[i].offsetHeight)
     }


     for(var x=num;x<pic_HS.length;x++) {
         var minh = Math.min.apply(null, minH);//获取高度最低的
         // var minh=minH.sort(function(x,y){return x>y})[0];
         var index = minH.indexOf(minh);

         var leftW = index * picW;
         var topH = minH[index];


         pic_HS[x].style.position = 'absolute';
         pic_HS[x].style.left = leftW + 'px';
         pic_HS[x].style.top = topH + 'px';

minH[index]=minh+pic_HS[x].offsetHeight;

     }
}

function scroll_load(add_pic) {
    var container=document.querySelectorAll('.container')[0];
    var src = [];
    for (var i = 0; i < add_pic.length; i++) {
        src.push(add_pic[i].src)

    }
    for (var x = 0; x < src.length; x++) {
        var obox = document.createElement('div');
        obox.className = 'box';
        var opic = document.createElement('div');
        opic.className = 'pic';
        obox.appendChild(opic);
        var oimg = document.createElement('img');
        oimg.src = "../img/"+ src[x];
        opic.appendChild(oimg);
        container.appendChild(obox)
    }
    pic_sort(6);

}


function promise_scroll(){
    var pic_num=document.querySelectorAll('.box');

    var last_picH=Math.floor(pic_num[pic_num.length-1].offsetHeight/2)+pic_num[pic_num.length-1].offsetTop;
    var scroltop=document.body.scrollTop||document.documentElement.scrollTop;
    var client=document.body.clientHeight||document.documentElement.clientHeight;


if(scroltop+client>last_picH){
    return true
}
else {
    return false
}
}
