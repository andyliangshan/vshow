/**
 * Created by andy on 17/11/15.
 */
$(function () {
    // hover效果
    function hoverClass(classname, claassname1, classname2) {
        var $cell = $('' + classname);
        $cell.hover(function () {
            var that = $(this);
            that.find('' + claassname1).animate({top: '50%'}, 300);
            that.find('' + classname2).animate({height: '100%'}, 200);
        }, function () {
            var that = $(this);
            that.find('' + claassname1).animate({top: '-500%'}, 100);
            that.find('' + classname2).animate({height: '0%'}, 200);
        });
    }
    hoverClass('.eduGongguan .con', '.box', '.backtobg');
    hoverClass('.produceInstru .con', '.box', '.backtobg');

});