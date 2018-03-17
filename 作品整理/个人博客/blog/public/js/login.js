



//账号规则的基本检测

function inputCheck(value1,ruler){
    var test1=ruler.test(value1.trim());
    return test1
}

//提交按钮状态的控制对象
var passCondition={
    isusername:false,       //检测用户名合法性
    isphonenumber:false,    //检测手机号合法性
    ispassword:false,       //检测密码合法性
    isrepeat:false,         //检测密码是否一致
    isvisit:false           //检测是否被访问
};


//判断条件，控制提交按钮是否有效
function submitAllow(conditions,submitRadio){
    for(k in conditions){
        if(conditions[k]===false){
            submitRadio.attr('disabled','disabled');
            return
        }
    }
    submitRadio.removeAttr('disabled');
}

//登录界面用户输入检测
$('.username_container').find('input[name="username"]').on('keydown',function() {
    var user_name=$(".username_container input").val();
    var ruler=/^1[0-9]{10}/;
    var results=inputCheck(user_name,ruler);
    if(results){
   $(".username_notic").hide();
   $('.username_container').find('span.glyphicon-ok').show();

    }
    else{
        $(".username_notic").show();
        $('.username_container').find('span.glyphicon-ok').hide();

    }
});


$('.psd_container').find('input[type="password"]').on('keydown',function() {
    var psd=$('.psd_container input').val();
    var ruler=/[A-Za-z0-9]{5,11}/;
    var results=inputCheck(psd,ruler);
    if(results){
        $(".psd_notic").hide();
        $('.psd_container').find('span.glyphicon-ok').show();
    }
    else{
        $(".psd_notic").show();
        $('.psd_container').find('span.glyphicon-ok').hide();
    }
});





//登录界面转注册页面事件
$('.to-register').click(function(){
$('.login').hide();
$('.register').show();
});

//注册页面检测
var submitButton=$('.registerForm').find('input[type="submit"]');
//用户名输入处理
$('#registerUsername').on('input',function (){
var registerUsername=$('#registerUsername').find('input[name="registerUsername"]').val();
    var ruler=/^[a-zA-Z]{1}[a-zA-Z0-9]{4,11}/;
    var results=inputCheck(registerUsername,ruler);
    if(results){
      $('#registerUsername').find('span.glyphicon-ok').addClass('active');
        passCondition.isusername=true;
    }
    else{
        $('#registerUsername').find('span.glyphicon-ok').removeClass('active');
        passCondition.isusername=false;
    }
    submitAllow(passCondition,submitButton)
});

//手机号输入处理
$('#userPhoneNumber').on('input',function (){
    var userPhoneNumber=$('#userPhoneNumber').find('input[name="phoneNumber"]').val();
    var ruler=/[0-9]{11}/;
    var results=inputCheck(userPhoneNumber,ruler);
    if(results){
        $('#userPhoneNumber').find('span.glyphicon-ok').addClass('active');
        passCondition.isphonenumber=true;
    }
    else{
        $('#userPhoneNumber').find('span.glyphicon-ok').removeClass('active');
        passCondition.isphonenumber=false;
    }
    submitAllow(passCondition,submitButton)
});

//密码输入处理
$('#registerPassword').on('input',function (){
    var registerPassword=$('#registerPassword').find('input[name="registerPassword"]').val();
    var ensurePassword=$('#ensurePassword').find('input[name="ensurePassword"]').val();
    var ruler=/[A-Za-z0-9]{5,11}/;
    var results=inputCheck(registerPassword,ruler);

    if(results){
        $('#registerPassword').find('span.glyphicon-ok').addClass('active');
        //防止用户验证通过时修改密码，导致重输入功能失效

        if(registerPassword===ensurePassword){
            if(passCondition.isvisit) {
                $('#ensurePassword').find('span.glyphicon-ok').addClass('active');
                $('#ensurePassword').find('span.glyphicon-remove').removeClass('active');
            passCondition.isrepeat=true;}
        }
        else {
            if(passCondition.isvisit) {
                $('#ensurePassword').find('span.glyphicon-ok').removeClass('active');
                $('#ensurePassword').find('span.glyphicon-remove').addClass('active');
                passCondition.isrepeat = false;
            }
        }

passCondition.ispassword=true;

    }
    else {
        $('#registerPassword').find('span.glyphicon-ok').removeClass('active');
        passCondition.ispassword=false
    }
    submitAllow(passCondition,submitButton)
});
//密码确认处理
$('#ensurePassword').on('input',function(){
    passCondition.isvisit=true;
    var registerPassword=$('#registerPassword').find('input[name="registerPassword"]').val();
    var ensurePassword=$('#ensurePassword').find('input[name="ensurePassword"]').val();
if(registerPassword===ensurePassword){
    $('#ensurePassword').find('span.glyphicon-ok').addClass('active');
    $('#ensurePassword').find('span.glyphicon-remove').removeClass('active');
    passCondition.isrepeat=true;
}
else {
    $('#ensurePassword').find('span.glyphicon-ok').removeClass('active');
    $('#ensurePassword').find('span.glyphicon-remove').addClass('active');
    passCondition.isrepeat=false;
}
    submitAllow(passCondition,submitButton)
});

//注册成功返回登录界面
$('.toLogin').click(function () {

        $('.login').show();
        $('.register').hide();
        $('.registerSuccess').hide();
        $('.registerexit').hide();

});

//提交注册数据至后台
$('.register').find('input[type="submit"]').on('click',function(e){
    e=e||window.e;
    e.preventDefault();
   $.ajax({
       url: '/api/user/register',
       data:{
           registerusername:$('#registerUsername').find('input[name="registerUsername"]').val(),
           userPhoneNumber:$('#userPhoneNumber').find('input[name="phoneNumber"]').val(),
           registerpassword:$('#registerPassword').find('input[name="registerPassword"]').val(),
           ensurepassword:$('#ensurePassword').find('input[name="ensurePassword"]').val()
           },
       dataType:'json',
       type:'post',
success:function (res) {
    registerResultHandle(res.isregister);
}

   });


});
    //提交注册后,处理注册结果
    function registerResultHandle(isregister){
        if(!isregister) {
            $('.login').hide();
            $('.register').hide();
            $('.registerSuccess').show();
        }
        else{
            $('.registerexit').show();
        }
    }

    //登录结果处理
function handleLoginResult(data){
  if(data.isExisit) {
var username=data.username;
if(data.isAdmin){
    location.href='/admin/user'
}
else {
    location.href='/';
}
        $('.err_mess').hide();
                    }
  else {
        $('.err_mess').show();
  }


}

    //登录的ajax
$('.submit_container').find('input[type="submit"]').on('click',function(e){
    e=e||window.e;
    e.preventDefault();
    $.ajax({
    url:'/api/user/login',
    dataType:'json',
    type:'post',
    data:{
        username:$('.username_container').find('input[name="username"]').val(),
        password:$('.psd_container').find('input[name="password"]').val()
    },
    success:function (res){

        handleLoginResult(res)
    }
})


});




