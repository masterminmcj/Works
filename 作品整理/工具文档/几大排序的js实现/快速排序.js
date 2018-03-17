/**
 * 原理：取第一个元素作为之间的切分元素，然后把大于中间元素的值放在中间元素的右边，
 * 小于中间元素的放在左边，这样遍历到元素的结尾就实现的有序排序。
 * 重要思想:选定之间元素然后从数组的左边开始找到大于中间元素的值在从数组的右边找到小于中间元素的值，若右边查找的下标大于左边
 * 就交换两个元素的值。
 * 然后在使用递归，前一个中间元素分左右在进行排序
 * 跳出递归条件:当左边的下标大于等于右边的下标时
 */

function Quick(arr,start,end){
var starts=start||0;
var ends=end||(arr.length-1);
if(ends<=starts){
    return
}
var mid=Deivide(arr,starts,ends);
   Quick(arr,starts,mid-1);
   Quick(arr,mid+1,ends);
   return arr
}
function Deivide(arr,start,end){
var i=start,j=end+1;
var v=arr[i];
while(true) {
    while (true) {
        if (arr[++i] > v){
            break;
        }
        if (i === end) {
            break;
        }
    }
    while (true) {
        if (arr[--j] < v) {
            break;
        }
        if(j === start) {
            break
        }
    }

if(i>=j){

        break;
}
 var p=arr[i];
  arr[i]=arr[j];
  arr[j]=p;
    console.log(arr)

}
 var t=arr[start];
 arr[start]=arr[j];
 arr[j]=t;
    console.log(arr)

    return j
}
var a=[5,3,4,6,1,8,2,7,112,34,34,45,1,2,34,45,23,5,7,88,45,56,88,12,34,565,67,9];
console.log(Quick(a));