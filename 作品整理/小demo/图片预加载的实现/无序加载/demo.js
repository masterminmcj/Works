/**
 * Created by mastermin on 17-8-4.
 * 编写图片预加载代码并注册成jquery插件
 */


;

(function ($) {


    function Pic_load(imgs,container) {
        var _this_=this;
        this.index = 0;
        this.container=container;
        this.img_display=container.find('.img_display img');
        this.prev=container.find('.prev');
        this.next=container.find('.next');
        this.imgs=imgs;
        this.load_img();

        this.prev.on('click',function(){
            _this_.page_move($(this))


        });
        this.next.on('click',function(){

            _this_.page_move($(this))

        })
    }

    //翻页脚本
    Pic_load.prototype.page_move = function (target) {
var img_display=this.img_display;
        var imgs = this.imgs;

        if (target[0].className === 'prev') {
            this.index = Math.max(0, --this.index);
        }
        else {
            this.index = Math.min(imgs.length - 1, ++this.index);
        }
        var src="./img/" + imgs[this.index].src;
        img_display.attr('src',src);
        document.title = this.index + 1 + '/' + imgs.length
    };


//图片安装数组依次加及进度条处理
    Pic_load.prototype.load_img = function () {
        var count = 0;
        const len = this.imgs.length;
        this.imgs.forEach(function (val) {


            var n_img = new Image();
            $(n_img).on('load error', function () {

                count++;
                $('.progress').html('图片正在加载中:' + Math.round(count / (len - 1) * 100) + '%');
                if (count >= len) {
                    $('.load_imgs').hide();
                    document.title = "1/" + len;
                }
            });

            n_img.src = './img/' + val.src


        })
    };

    $.fn.extend({
        pic_load_advance:function(imgs){
            this.each(function()
            {
                new Pic_load(imgs,$(this))
            });
            return this;
        }

    })

})(jQuery);


