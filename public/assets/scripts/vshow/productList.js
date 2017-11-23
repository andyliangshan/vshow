/**
 * Created by andy on 17/11/19.
 */
$(function () {
    // hover效果
    function hoverClass(classname, claassname1, classname2) {
        var $cell = $('' + classname);
        var $height = $('.other').height();
        $cell.hover(function () {
            var that = $(this);
            that.find('' + claassname1).stop().animate({top: '50%'}, 300);
            that.find('' + classname2).stop().animate({height: '100%'}, 200);
        }, function () {
            var that = $(this);
            that.find('' + claassname1).stop().animate({top: '-1000%'}, 100);
            that.find('' + classname2).stop().animate({height: '0%'}, 200);
        });
    }
    hoverClass('.listcont li .other', '.showtext', '.showbg');

    // 分页数据
    $("#pagination1").pagination({
        currentPage: 1,
        totalPage: 8,
        count: 4,
        callback: function(current) {
            console.log(current);
            // ajax请求数据
        }
    });
});