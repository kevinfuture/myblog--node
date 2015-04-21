/**
 * Created by Administrator on 2015/3/9.
 */
$(function(){
    $(".nav #base-msg").click(function(){
        $('.nav #base-msg .hide').toggle();
    });
});
$(function(){
    var iNow = 0;

    var timer = null;
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
});

//// 正则表达式--用户名
//var reg=/^[a-z0-9-]{6,10}$/;

//// 正则表达式--密码
//var reg=/^[a-z0-9]{6,10}$/;

//// 正则表达式--手机号
//var reg=/^1[3|5|8]\d{9}$/;

//// 正则表达式--邮箱
//var reg=/^\w+@[a-z0-9-]+(\.[a-z]{2,6}){1,2}$/;
