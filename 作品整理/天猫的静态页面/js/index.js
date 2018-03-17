/**
 * Created by mastermin on 17-8-14.
 */
;


(function ($) {
     var category_bar=$('.category_bar');
     var category_item=$('.category_bar_nav>span');
     var category_bar_nav=$('.category_bar_nav');
     var category_bar_content=$('.category_bar_content');
     var category_bar_content_item=$('.category_bar_content_container');



category_item.each(function (index,val){

    $(val).on('mouseover',function (e){

        e.stopPropagation();
        $(val).addClass('cursor_over').siblings().removeClass('cursor_over');
        category_bar_content.addClass('shows');
        category_bar_content_item.eq(index).addClass('shows').siblings().removeClass('shows')
    });
});
    category_bar.on('mouseout',function(e){
var x=e.clientX;
var y=e.clientY;
var H=document.body.scrollTop;
var Width=category_bar.width();

if(x<=152||x>(354+0.65*Width)||(y+H<=227)||(y+H)>=718){
    category_item.removeClass('cursor_over');
    category_bar_content.removeClass('shows');
    category_bar_content_item.removeClass('.shows')
}
    });
})(jQuery);







