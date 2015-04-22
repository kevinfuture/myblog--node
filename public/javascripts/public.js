/**
 * Created by Administrator on 2015/3/9.
 */

//$(function(){
//    var timer = null;
//    $(".nav #base-msg").mouseover(function(){
//            clearTimeout(timer);
//            $('.nav #base-msg .hide').show();
//    });
//    $('.nav #base-msg .hide').mouseover(function(){
//        clearTimeout(timer);
//        $('.nav #base-msg .hide').show();
//
//    });
//    $(".nav #base-msg").mouseout(function(){
//       timer= setTimeout(function(){
//            $('.nav #base-msg .hide').hide();
//        },300)
//
//    });
//    $(".nav #base-msg .hide").mouseout(function(){
//         timer= setTimeout(function(){
//            $('.nav #base-msg .hide').hide();
//        },300)
//
//    });
//
//});
$(function(){
    var iNow = 0;
    var timer = null;
    var aLi = $('.bd ul li');
    $('.bd ul').css({'width':(aLi.length *aLi.eq(0).width() )+'px'});
    function bb(){
        iNow++;
        if(iNow ==  (aLi.length)){
            $('.bd ul').css({'left':0 +'px'});
            iNow =1;
        }
        $('.bd ul').animate({"left":-480*(iNow)},700);
    }
    $('#next').click(function(){
        bb();
    });
    $('#pre').click(function(){
        iNow--;
        if(iNow ==  -1){
            $('.bd ul').css({'left':-(($('.bd li').length-1) *aLi.eq(0).width()) +'px'});
            iNow =$('.bd li').length-2;
        }

        $('.bd ul').animate({"left":-480*(iNow)},700);
    });
    $('.bd').mouseover(function(){
      clearInterval(timer);
    });
    $('.bd').mouseout(function(){
        timer = setInterval(bb,3000);
    });
    timer = setInterval(bb,3000);
});


