/**
 * Created by mastermin on 17-7-15.
 */
$(".l_t").hide();

$(".nav_item>a").mouseover(function(e) {
    e=e||window.e;

    ($(e.target).next().show(500))
});

$(".nav_item>a").mouseout(function(e) {
    e=e||window.e;

    ($(e.target).next().hide(500))
});