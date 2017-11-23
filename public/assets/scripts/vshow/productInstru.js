/**
 * Created by andy on 17/11/16.
 */
$(function () {
    // 案例切换
    var _li = $('.ulli li');
    _li.click(function (e) {
        e.preventDefault();
        $(this).find('a').css('text-decoration', 'none');
        $(this).find('a').addClass('active').end().siblings().find('a').removeClass('active');
        var indx = _li.index(this);
    });

});