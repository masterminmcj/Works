/**
 * Created by mastermin on 17-10-11.
 */
function f(n){
    var sum=0;
    var arr=[];
    arr[1]=1;
    arr[2]=1;
    if(n<=2){
        return 1
    }
    else {
        for (var i=3;i<=n;i++) {
            arr[i] = arr[i - 1] + arr[i - 2]
        }

        return arr[n]
    }

}

console.log(f(7));