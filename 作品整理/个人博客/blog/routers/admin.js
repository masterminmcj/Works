/**
 * Created by mastermin on 17-9-17.
 */
var express=require('express');
var router=express.Router();
var User=require('../model/user');
var Category=require('../model/category');
var Content=require('../model/Content');
//判断管理员身份
router.use(function(req,res,next){

   if(!req.userInfo.isAdmin){
       res.send('对不起，只有管理员才可登录后台');
   return
   }

next()
});



router.get('/user',function(req,res,next) {

    res.render('./admin/index',{
        userInfo:req.userInfo
    })
});


//分页处理



router.get('/userManage',function (req,res,next){

    var page=Number(req.query.page)||1;

    var limit=4;
    var Allcount=0;
    User.count().then(function(count){

        Allcount=count;
        var pages=Math.ceil(Allcount/limit);
        page=Math.min(page,pages);
        page=Math.max(page,1);
        var skips=(page-1)*limit;

        User.find().sort({_id:-1}).limit(limit).skip(skips).then(function(users){
            res.render('./admin/userManage',{
                userInfo:req.userInfo,
                userList:users,
                pages:pages,
                nowpage:page
            })
        });

    });



});
//分类首页路由
router.get('/category_index',function(req,res,next){

    var page=Number(req.query.page)||1;

    var limit=4;
    var Allcount=0;
    Category.count().then(function(count){

        Allcount=count;
        var pages=Math.ceil(Allcount/limit);
        page=Math.min(page,pages);
        page=Math.max(page,1);
        var skips=(page-1)*limit;

       Category.find().sort({_id:-1}).limit(limit).skip(skips).then(function(lists){
            res.render('./admin/category_index',{
                userInfo:req.userInfo,
                categoryList:lists,
                pages:pages,
                nowpage:page
            })
        });

    });

});

//分类添加
router.get('/category_add',function(req,res,next){
    res.render('./admin/category_add',{
        userInfo:req.userInfo
    })
});
module.exports=router;

/**
 * 分类的修改
 * 当是get请求即为修改编辑请求时返回的是一个编辑页面
 * 当是ｐｏｓｔ请求即为修改提交返回的是一个修改结果处理
 */
router.get('/categoryManage/edit',function(req,res,next){
    var _id=req.query.id;

var CurrentCategory={};
    Category.findOne({
        _id:_id
    }).then(function(name){
        CurrentCategory.name=name.categoryName;
    });

   res.render('./admin/edit',{
       userInfo:req.userInfo,
       CurrentCategory:CurrentCategory
   })
});


router.post('/categoryManage/edit',function(req,res,next){
    var handleMess={};//定义不同结果的处理
    var CurrentValue=req.body.CurrentValue;//获取没修改之前的值
    var EditMess=req.body.categoryAdd;//当前修改过的分类
    var id='';

    //通过没修改之前的值得到其_id
    Category.findOne({
        categoryName:CurrentValue
    }).then(function(r) {

        id=r._id;
        //提交的内容为空
        if(EditMess.trim()===''){
            handleMess.categoryHandleState=1;
            handleMess.callbackMess='分类不能为空!';
        }
        //没做任何修改就提交
        else if(CurrentValue===EditMess){
            handleMess.categoryHandleState=2;
            handleMess.callbackMess='分类修改成功!';
        }
        //提交的值已存在或者修改成功处理
        else {
            Category.findOne({
                categoryName:EditMess
            }).then(function(results){
                if(results){
                    handleMess.categoryHandleState=1;
                    handleMess.callbackMess='分类已存在!';
                }
                else {
                    Category.update({
                        _id:id
                    },{
                        categoryName:EditMess
                    },function (err){
                    });
                    handleMess.categoryHandleState=2;
                    handleMess.callbackMess='分类更新成功!';

                }

            })

        }

        res.render('./admin/categoryHandle',{
            handleMess:handleMess
        });


    });


});

/**
 * 删除操作
 */
router.get('/categoryManage/delete',function(req,res){
   var id=req.query.id;
   var handleMess={};
   Category.remove({
       _id:id
   }).then(function(){
       handleMess.categoryHandleState=2;
       handleMess.callbackMess='分类删除成功!';
       res.render('./admin/categoryHandle',{
           handleMess:handleMess
       });
   });


});

/**
 * 博客内容首页路由
 *
 */
router.get('/blogContent_index',function (req,res,next){
    var page=Number(req.query.page)||1;

    var limit=4;
    var Allcount=0;
    Content.count().then(function(count){

        Allcount=count;
        var pages=Math.ceil(Allcount/limit);
        page=Math.min(page,pages);
        page=Math.max(page,1);
        var skips=(page-1)*limit;

        Content.find().sort({_id:-1}).limit(limit).skip(skips).then(function(lists){

            res.render('./admin/blogContent_index',{
                userInfo:req.userInfo,
                ContentTitleList:lists,
                pages:pages,
                nowpage:page
            })
        });

    });

});

/**
 * 博客内容发布
 */
router.get('/blogContent_add',function(req,res,next){

res.render('./admin/blogContent_add',{
    userInfo:req.userInfo
})
});

/**
 * 博客内容的修改
 * 与前面内容的修改基本差不多
 */
router.get('/Content/edit',function(req,res,next){
    var _id=req.query.id;
Content.findOne({
    _id:_id
}).then(function(result) {
    res.render('./admin/blogEdit',{
        userInfo:req.userInfo,
        CurrentContent:result
    })
})
});

router.post('/Content/edit',function(req,res,next){
    var handleMess={};//定义不同结果的处理
    var CurrentValue=req.body.CurrentTitle;//获取没修改之前的标题
    var EditMess=req.body.blogTitle;//当前修改过的标题
    var id='';

    //通过没修改之前的值得到其_id
    Content.findOne({
      title:CurrentValue
    }).then(function(r) {

        id=r._id;

        //提交的内容为空
        if(EditMess.trim()===''){
            handleMess.categoryHandleState=1;
            handleMess.callbackMess='标题不能为空!';
        }
        //没做任何修改就提交
        else if(CurrentValue===EditMess){
            handleMess.categoryHandleState=2;
            handleMess.callbackMess='博客修改成功!';
        }
        //提交的值已存在或者修改成功处理
        else {
            Content.findOne({
                title:EditMess
            }).then(function(results){
                if(results){
                    handleMess.categoryHandleState=1;
                    handleMess.callbackMess='该博客已存在!';
                }
                else {
                    Content.update({
                        _id:id
                    },{
                        title:EditMess
                    },function (err){
                    });
                    handleMess.categoryHandleState=2;
                    handleMess.callbackMess='分类更新成功!';

                }

            })

        }

        res.render('./admin/categoryHandle',{
            handleMess:handleMess
        });
    });
});
router.get('/Content/delete',function(req,res){
    var id=req.query.id;
    var handleMess={};
    Content.remove({
        _id:id
    }).then(function(){
        handleMess.categoryHandleState=2;
        handleMess.callbackMess='分类删除成功!';
        res.render('./admin/categoryHandle',{
            handleMess:handleMess
        });
    });


});
