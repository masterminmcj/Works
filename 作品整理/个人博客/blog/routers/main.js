/**
 * Created by mastermin on 17-9-17.
 */
var express=require('express');
var router=express.Router();
var Category=require('../model/category');
var Content=require('../model/Content');


router.get('/',function(req,res,next) {

Category.find().then(function(r){

    Content.find().sort({_id:-1}).then(function (results) {

        res.render('./main/index', {
            userInfo: req.userInfo,
            categories:r,
            Blog: results
        })
    });
})


});

router.get('/login/login.html',function(req,res,next) {

    res.render('./main/login',{

    });

});

//精选博文部分
router.get('/goodBlog/good_blog',function(req,res,next) {

    Category.find().then(function(r){

        Content.find().sort({_id:-1}).then(function (results) {

            res.render('./main/good_blog', {
                userInfo: req.userInfo,
                categories:r,
                Blog: results
            })
        });
    })


});
module.exports=router;