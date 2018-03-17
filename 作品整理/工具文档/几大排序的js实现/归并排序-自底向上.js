/**
 *原理：与前面的自顶向下的原理的是自底向上原理是先一一归并，然后在四四归并最后
 * 形成最后的大的归并他比自顶向下要简洁的多
 */
function Merger(arr,start,mid,end){
    var middle = mid+1||Math.floor(arr.length/2);//如果用户没有提供初始值，默认为数组一半

    var mids = middle;//用来操作数组右边
    var s = start||0;//用来操作数组左边，默认值为0
    var ends=end||arr.length-1;//递归数组的最右端
    var arr1 = [];//新建数组保存原数组

    for (var i = 0; i <=ends; i++) {
        arr1[i] = arr[i]//复制原数组
    }

    for (var k = s; k <=ends; k++) {

        //左边的数已经被取完了，取右边的数
        if (s >=middle) {
            arr[k] = arr1[mids++]
        }
        //右边的数已经被取完了，取左边的数
        else if (mids>ends) {
            arr[k] = arr1[s++]
        }
        //左边的数大于右边的数，取右边的数
        else if (arr1[s] > arr1[mids]) {
            arr[k] = arr1[mids++]

        }
        //右边的数大于等于左边的数，取左边的数
        else{
            arr[k]=arr1[s++]
        }
    }
    return arr
}

function sort(arr){

var len=arr.length;
for(var h=1;h<len;h=h+h){
    for(var start=0;start<len-h;start+=h+h){
        Merger(arr,start,start+h-1,Math.min(start+h+h-1,len-1));
    }

}

return arr
}

var a=[1,3,7,4,8,5,2,6,122,34,0,1,3,6,3,66,89,123];

console.log(sort(a));
