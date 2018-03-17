/**
 * Created by mastermin on 17-9-16.
 */
var express=require('express');
var swig=require('swig');
var app=express();
var path=express.static(__dirname+'/public');//加载静态资源库
var mongoose=require('mongoose');            //使用mongose
var body_parser=require('body-parser');      //包装http请求,使用req.body即可访问请求内容
var Cookies=require('cookies');              //调用cookie模块

app.engine('html',swig.renderFile);         　//使用swig模板引擎来渲染模板

var User=require('./model/user');             //调用ｕｓer的数据模型

//清除默认的模板缓存
swig.setDefaults({
    cache:false
});
//配置swig模板
app.set('views','./views');

//设置模板引擎的格式即运用何种模板引擎
app.set('view engine','html');


//设置静态文件托管
app.use('/public',path);


//对于不同请求加载处理相应的模块
//配置body-parser
app.use(body_parser.urlencoded({extended:true}));


//配置cookie
app.use(function(req,res,next){
    req.cookies=new Cookies(req,res);

    req.userInfo={};

    if(req.cookies.get('userInfo')) {
        req.userInfo = JSON.parse(req.cookies.get('userInfo'));
        User.findById(req.userInfo.id).then(function (result) {
           req.userInfo.isAdmin=Boolean(result.isAdmin);
            next()
        });
    }
        else
        {
            next();
        }



});


//前台主模块
app.use('/',require('./routers/main'));
//后台处理模块
app.use('/admin',require('./routers/admin'));
//api处理模块
app.use('/api',require('./routers/api'));


mongoose.connect('mongodb://localhost:27018/mymogo',function(err) {
    if(err){
        console.log('数据库连接失败！')
    }
    else {
        console.log('数据库连接成功!');

        }
});

app.listen(8888);