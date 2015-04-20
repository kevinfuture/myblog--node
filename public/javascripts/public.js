/**
 * Created by Administrator on 2015/3/9.
 */
$(function(){
    $(".nav #base-msg").click(function(){
        $('.nav #base-msg .hide').show();
    });
});
$(function(){
    var iNow = 0;

    var timer = null;
    //for(var i=0; i<$('.hd li').length; i++){
    //    (function(index){
    //        $('.hd li').eq(index).click(function(){
    //            iNow = index;
    //            jQuery(".b_left .hoverBg").animate({"margin-top":60*index+"px"},700);
    //        });
    //    })(i);
    //}
    function bb(){
        if(iNow == $('.bd li').length-1){
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
        timer = setInterval(bb,2000);
    });
    timer = setInterval(bb,2000);
})