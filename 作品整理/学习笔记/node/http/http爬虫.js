/**
 * Created by mastermin on 17-6-11.
 */
/**抓取慕课网node.js基础<1>的课程信息**/

var http=require("http");
var cheerio=require("cheerio");
var url="http://www.imooc.com/learn/348";
var html="";
http.get(url,function(res) {
    res.on("data", function (datas) {
        html += datas;
    });

    res.on("end", function () {
        var couseData=fliterCode(html);
        pritfData(couseData);
    });
    res.on("error", function () {

    });

});
function fliterCode(html){
    var $=cheerio.load(html);
    var charpters=$(".chapter");
    var getData=[];
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
getData.push(charterData)

    });
return getData

}

function pritfData(course) {
    course.forEach(function(item){
        console.log(item.chapterTitle+"/");
        item.vidiosMess.forEach(function(item){
            var title=item.title.trim();
            var id=item.id.trim();
            console.log("["+id+"]"+"  "+title);

        })
    })

}