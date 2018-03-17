//归并过程,接收两个参数即要归并的数组和开始归并的位置
//原理，归并排序分成两部分，第一部分是排序，第二部分是归并，其实排序的过程是小的归并过程
//分析:把一个大数组分解成左右两边,左边再分成两部分，右边也这样，这样依次递归下去，直到左边和右边只有一个元素，然后从最小的部分进行
//归并在合成一个大的数组最后完成排序过程是分解--》最小单位归并--》依次向上归并--》完成整个归并排序

//单个归并排序的原理是:新建一个数组用来存储原数组，然后通过比较左右元素，把较小的依次放到原数组。
//排序复杂度:1/2NlgN-NlgN次比较
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
            //左边的数大于右边的数，取右边的数
            if (arr1[s] > arr1[mids]) {
                arr[k] = arr1[mids++]

            }
            //左边的数已经被取完了，取右边的数
            else if (s >= middle) {
                arr[k] = arr1[mids++]
            }
            //右边的数已经被取完了，取左边的数
            else if (mids >ends) {
                arr[k] = arr1[s++]
            }

            //右边的数大于等于左边的数，取左边的数
            else{
                arr[k]=arr1[s++]
            }
        }
return arr
}



function sort(arr,start,end){
    //柯里化
    var starts=start||0;
    if(end===undefined){
        var ends=arr.length-1
    }
    else {
        ends=end
    }
    if(start>=end){
        return
    }
    //取之间的数
    var mid=starts+Math.floor((ends-starts)/2);
    //左边排序
    sort(arr,starts,mid);
    //右边排序
    sort(arr,mid+1,ends);
    //归并
    var arrs=Merger(arr,starts,mid,ends);
return arrs
}

var a=[9,1,8,6,2,4,3,7,5,11,1,0,22,4,56,0,111,224,35,56,7,9,1213,45,89,34,546,67];
console.log(sort(a));
