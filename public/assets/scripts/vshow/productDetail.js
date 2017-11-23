/**
 * Created by andy on 17/11/17.
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
    // 向上滚动箭头
    var $con = $('.casedetaillist-cont .container');
    var topValue = $con.offset().top + 1;
    var $top = $('.backlistTop');
    $top.css({
        'display': 'none',
        'margin-left': $con.width()/2 + 15 + 'px'
    });
    $top.click(function (e) {
        e.preventDefault();
        $('body, html').animate({
            scrollTop: topValue
        }, 1000);
    });
    var e = $top,
      t = $(".contact"),
      n = document;
    $(window).scroll(function() {
      var a = $(n).scrollTop(),
        i = $(n).height(),
        o = $(window).height();
      if(a >= topValue){
        if(!e.is(':visible')){
          $top.fadeIn(500);
          t.css("margin-top", "20px");
        }
      }else{
        $top.fadeOut(500);
        t.css("margin-top", "0");
      }
      if(880 >= i - a - o){
        t.css("margin-top", "0");
        $top.fadeOut(500);
      }
    });

    // 案例切换
    var _li = $('.ullidetail li');
    _li.click(function (e) {
        e.preventDefault();
        $(this).find('a').css('text-decoration', 'none');
        $(this).find('a').addClass('active').end().siblings().find('a').removeClass('active');
        var indx = _li.index(this);
    });

});