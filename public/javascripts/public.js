/**
 * Created by Administrator on 2015/3/9.
 */

$(function(){
    var bShow = false;
    $(".nav #base-msg").click(function(){
        bShow = true;
        $('.nav #base-msg .hide').show();
    });
    //$(document).click(function(){
    //    if(bShow == true){
    //        $('.nav #base-msg .hide').hide();
    //    }
    //});

});
$(function(){
    var iNow = 0;
    var timer = null;
    var oUL = $('.bd ul').html() +   $('.bd ul').html();
    var nUl = $('.bd ul').html( oUL);
    console.log(nUl);
    function bb(){
        if(iNow == $('.bd li').length-1){
            $('.bd ul').animate({"left":-480*(iNow)},700);
            iNow = 0;
        }else{
            iNow++;
        }

        $('.bd ul').animate({"left":-480*(iNow)},700);
        //jQuery(".b_left .hoverBg").animate({"margin-top":60*iNow+"px"},700);
    }
    //bb();
    $('#next').click(function(){
        bb();
    });
    $('#pre').click(function(){
        iNow--;
        if(iNow ==  -1){
            iNow =$('.bd li').length-1;
        }

        $('.bd ul').animate({"left":-480*(iNow)},700);
        //jQuery(".b_left .hoverBg").animate({"margin-top":60*iNow+"px"},700);
    });
    $('.bd').mouseover(function(){
      clearInterval(timer);
    });
    $('.bd').mouseout(function(){
        timer = setInterval(bb,3000);
    });
    timer = setInterval(bb,3000);
});


