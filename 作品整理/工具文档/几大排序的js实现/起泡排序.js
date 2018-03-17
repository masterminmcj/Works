

//原理分析：起泡排序的原理是相邻两个元素比较大小，并交换元素，这样比较到结束最大的元素会出现在最右侧，再次进行循环，次最大出现在次右端
//每次循环后最右端的元素不参与比较

var arr=[1,2,4,0,5,7,2,9,1,3,4,-1,-3];

function bubbleSort(arr){
    var len=arr.length;
    for(var i=len-1;i>0;i--){
        for(var j=0;j<i;j++){
            var p=j+1;
            if(arr[j]>=arr[p]){
                var t=arr[j];
                arr[j]=arr[p];
                arr[p]=t;
            }
        }

    }
    return arr

}
console.log(bubbleSort(arr))
