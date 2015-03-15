/**
 * Created by Administrator on 2015/3/9.
 */
$(function(){
    $(".nav #base-msg").click(function(){
        $('.nav #base-msg .hide').show();
    });
});
$(function(){
    var iNow = 1;
    var timer = null;
    for(var i=0; i<$('.hd li').length; i++){
        (function(index){
            $('.hd li').eq(index).click(function(){
                iNow = index;
                jQuery(".b_left .hoverBg").animate({"margin-top":60*index+"px"},700);
            });
        })(i);
    }
    function bb(){
        if(iNow == $('.hd li').length-1){
            iNow = 0;
        }else{
            iNow++;
        }
        $('.bd ul').animate({"margin-top":-300*(iNow-1)},700);
        jQuery(".b_left .hoverBg").animate({"margin-top":60*iNow+"px"},700);
    }
    bb();
    timer = setInterval(bb,3000);
})