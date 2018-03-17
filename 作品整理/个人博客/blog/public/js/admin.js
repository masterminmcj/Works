/**
 * Created by mastermin on 17-9-23.
 */
var btn=$('.pageShow>button.btn');
var totalPages=$('.pageShow span.totalPages span').text();
var activepage=$('.pageShow span.activepage span').text();

btn.on('click',function () {
var value=$('.pageShow>label>input').val();
value=Number(value);
totalPages=Number(totalPages);
value=Math.max(value,1);
value= Math.min(value,totalPages);
location.href='/admin/userManage?page='+value;//实现跳转到某一页
});


