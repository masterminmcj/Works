/**
 * Created by mastermin on 17-9-17.
 */
var express=require('express');
var router=express.Router();
var User=require('../model/user');
var Category=require('../model/category');
var Contents=require('../model/Content');
var responseData;
router.use(function(req,res,next) {
   responseData={
       isregister:''
   };
   next()
});


//添加分类返回的信息
var categoryMess={};

router.post('/user/register',function(req,res,next) {
    var registerusername=req.body.registerusername;
    var userPhoneNumber=req.body.userPhoneNumber;
    var registerpassword=req.body.registerpassword;

    User.findOne({
        username:registerusername
    }).then(function(result) {
      //若注册账号已存在isregister返回true
        if(result!==null){
            responseData.isregister=true;
            return res.json(responseData)
        }
        //若注册账号不存在isregister返回false,同时保存账号
        else{
            responseData.isregister=false;
            res.json(responseData);
            //保存数据至数据库
            var user=new User({
                username:registerusername,
                phonenumber:userPhoneNumber,
                password:registerpassword
            });

            return user.save()
        }
    })
});

router.post('/user/login',function(req,res,next){

var username=req.body.username;
var password=req.body.password;
User.findOne({
    username:username,
    password:password
}).then(function ( result) {
   if(result){
       responseData.isExisit=true;
       responseData.username=username;
       responseData.id=result._id;
       responseData.isAdmin=result.isAdmin;
       req.cookies.set('userInfo',JSON.stringify({
       id:responseData.id,
       username:responseData.username
       }));
   return res.json(responseData);
   }
else{
       responseData.isExisit=false;
       return res.json(responseData);
   }

})



});


router.get('/user/loginout',function(req,res,next){
    req.cookies.set('userInfo',null);
    responseData.isLoginout=true;
    return res.json(responseData)
});


//添加分类提交处理
router.post('/category/add',function(req,res,next){
    var categoryName=req.body.categoryAdd||'';
    if(categoryName===''){
            categoryMess.categoryHandleState=0;
            categoryMess.callbackMess='分类名不能为空';
          res.render('./admin/categoryHandle.html',{
              handleMess:categoryMess
          })
    }
    else{
        Category.findOne({
        categoryName:categoryName
    }).then(function(results){
        if(results){
            categoryMess.categoryHandleState=1;
            categoryMess.callbackMess='该分类已存在!';
            res.render('./admin/categoryHandle.html',{
                handleMess:categoryMess
            })

        }
        else {
            var type='categoryAdd';
            var categories=new Category({
                categoryName:categoryName
            });
            categories.save();
            categoryMess.categoryHandleState=2;
            categoryMess.callbackMess='添加分类成功!';
            categoryMess.type=type;
            res.render('./admin/categoryHandle.html',{
                userInfo:req.userInfo,
                handleMess:categoryMess
            })
        }
        })

    }




});

//定义一个存储博客信息的对象
var blogInfoSave={};
var blogMess={};//保存错误信息提示
router.post('/Content/add',function(req,res,next){
blogInfoSave.title=req.body.blogTitle||'';
blogInfoSave.Content=req.body.mainContent||'';
blogInfoSave.timeStamp=new Date().toLocaleDateString()||'';
blogInfoSave.author=req.body.author||'';
  if(blogInfoSave.title.trim()==='') {
      blogMess.categoryHandleState = 1;
      blogMess.callbackMess = '博客标题不能为空!';
  }
  else if(blogInfoSave.Content.trim()===''){
      blogMess.categoryHandleState=1;
      blogMess.callbackMess='博客内容不能为空!';

  }
  else if(blogInfoSave.author.trim()==='') {
      blogMess.categoryHandleState = 1;
      blogMess.callbackMess = '博客作者不能为空';

  }
  else {
      Contents.findOne({
          title:blogInfoSave.title
      }).then(function(result){
          if(result){
              blogMess.categoryHandleState=1;
              blogMess.callbackMess='已存在同标题的博客!';

          }
          else{
              var type='blogAdd';
              var Content=new Contents({
                  title:blogInfoSave.title,
                  mainContent:blogInfoSave.Content,
                  timeStamp:blogInfoSave.timeStamp,
                  author:blogInfoSave.author
              });
              Content.save();
              blogMess.categoryHandleState=2;
              blogMess.callbackMess='博客发布成功!';
              blogMess.type=type
          }
      });
  }
    return res.render('./admin/categoryHandle.html',{
        userInfo:req.userInfo,
        handleMess:blogMess
    })
});

module.exports=router;