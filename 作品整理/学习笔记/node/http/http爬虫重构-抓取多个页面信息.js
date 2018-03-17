/**
 * Created by mastermin on 17-6-16.
 */
/**
 * Created by mastermin on 17-6-11.
 */
/**抓取慕课网node.js基础<1>的课程信息**/

var http=require("http");
var Promise=require("bluebird");

var cheerio=require("cheerio");

var baseurl="http://www.imooc.com/learn/";
var videoId=[637,348,75,259];
function getPagenames(url){

    return new Promise(function(resolve,reject){
        console.log("正在获取"+url+"中信息.....");

        http.get(url,function(res) {
            var html="";

            res.on("data", function (datas) {
                html += datas;
            });

            res.on("end", function () {

                resolve(html);

            });
            res.on("error", function (e) {
                reject(e);
                console.log("获取数据出错")

            });

        });
    })
}

function fliterCode(html) {
    var $ = cheerio.load(html);
    var charpters = $(".chapter");
    var title=$(".clearfix h2").text();
     var numbers=$($("span.meta-value")[3]).text();
    var times=$($("span.meta-value")[2]).text();

    var courseDatas={
        title:title,
        numbers:numbers,
        times:times,
       videos:[]
    };

    charpters.each(function(){
        var charter=$(this);
        var charterTitle=charter.find("strong").text();

        var vidios=charter.find(".video").children("li");

        var charterData={
            chapterTitle:charterTitle,
            vidiosMess:[]
        };

        vidios.each(function(){

            var vidio=$(this).find(".J-media-item");
            var vidioTitle=vidio.text();
            var vidioId=vidio.attr("href").split("/")[2];
            charterData.vidiosMess.push({
                title:vidioTitle,
                id:vidioId
            })
        });
        courseDatas.videos.push(charterData)

    });
    return courseDatas

}



function pritfData(course){
 course.forEach(function(coursedata){
     console.log("-----------------------------------------------------------------------------------------");
     console.log(coursedata.title.trim()+"   "+"综合评分:"+
coursedata.numbers.trim()+"    "+"课程时长"+coursedata.times.trim()+"\n");

coursedata.videos.forEach(function(video){
    console.log(video.chapterTitle.trim());
    video.vidiosMess.forEach(function(videoMess){
        console.log(videoMess.title.trim())

    })

})



 })
    }




var courseArray=[];
videoId.forEach(function(id) {
    courseArray.push(getPagenames(baseurl+id));
});

Promise
.all(courseArray)
.then(function(pages) {
    var courseData = [];
    pages.forEach(function(html){
        var courses = fliterCode(html);
courseData.push(courses);
    });

    courseData.sort(function(a,b){

        return a.number<b.number;
    });
    pritfData(courseData)
});
