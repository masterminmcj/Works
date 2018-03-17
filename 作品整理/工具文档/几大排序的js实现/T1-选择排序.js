//原理是找出数据中最小的元素与第一个元素进行位置交换，在在剩下的元素中找出最小的与第二个元素进行交换
//特点：运行时间与输入无关，数据移动次数最小
//时间复杂度：N~N*N/2
function sort(arr){
  var len=arr.length;
  for(var i=0;i<len;i++){
//设开始最小值为第一个数
var min=i;
//比较每一个成员找到最小值下标
for(var j=i+1;j<len;j++){
    if(arr[min]>arr[j]){
        min=j//把最小值下标赋值给min
    }
}
//把找到的最小值与第一个数交换位置，然后在进行下一次交换
var t=arr[i];
arr[i]=arr[min];
arr[min]=t

  }
  return arr
}
