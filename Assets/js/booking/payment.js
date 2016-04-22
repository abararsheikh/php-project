/**
 * Created by ran on 4/12/2016.
 */
function init(){
    timer();
}

function timer(){
    var endTime = new Date();
    endTime.setSeconds(endTime.getSeconds()+ 4);
    //console.log(endTime);
    //getTimeRemaining(endTime);
    var timeinterval = setInterval(function(){
        var timer = getTimeRemaining(endTime);
        //console.log(timer);
        $("#timer").html(timer.seconds+" S");

        if(timer.total<=0){

            //alert("Session Expired");
            var url="../index.php?route=DetailController/gotoPayment";
            //console.log(url);
            $.get(url, function(data, status){
                alert('ORDER SAVED');
                window.location.replace("../index.php");
            })
            clearInterval(timeinterval);
        }
    },1000);
}



function getTimeRemaining(endTime){
    var d =new Date();
    var t = Date.parse(endTime) - Date.parse(d);
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );

    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };
}

init();