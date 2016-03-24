/**
 * Created by ran on 3/18/2016.
 */
function init(){
    paymentButton();
    var endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + 6);
    console.log(endTime);
    //getTimeRemaining(endTime);
    var timeinterval = setInterval(function(){
       var timer = getTimeRemaining(endTime);
        console.log(timer);
        $(".timer").html(timer.minutes+":"+timer.seconds+" Mins");
        if(timer.seconds<10){
            $(".timer").html(timer.minutes+":0"+timer.seconds+" Mins");
        }
        if(timer.total<=0){

            alert("Session Expired");
            var url="./index.php?route=DetailController/sessionExpired";
            console.log(url);
            $.get(url, function(data, status){

                window.location.replace("./index.php");
            })
            clearInterval(timeinterval);
        }
    },1000);
    deleteItem();
}

function deleteItem(){
    $(".ticket-booking").on("click",".delete",function(){
        var item_id =$(this).attr("value");
        //console.log(item_id);
        var url="./index.php?route=DetailController/deleteItems/"+item_id;
        console.log(url);
        $.get(url, function(data, status){

            var obj = JSON.parse(data);

            createBills(obj);
        })
    });

}

function createBills(obj){
console.log(obj);
    var grandPrice=0;
    var strDetail="<h2>TICKET BOOKING DETAIL</h2>";
    var strSummary="";
    for(var i=0;i<obj.length; i++){
        var id=i+1;
        // Movie Name:
        strDetail+="<div class="+"'"+"row"+"'"+">"+"<div class="+"'"+"col-gl-5 col-md-5 col-sm-12 detail-row"+"'"+">" + "Movie Name<span>:</span>"
        +"</div>";
        strDetail+="<div class="+"'"+"col-gl-5 col-gl-7 col-md-7 col-sm-12 detail-row"+"'"+">"+obj[i].Film_Name+"</div></div>";

        // Cinema Name:
        strDetail+="<div class="+"'"+"row"+"'"+">"+"<div class="+"'"+"col-gl-5 col-md-5 col-sm-12 detail-row"+"'"+">" + "Cinema<span>:</span>"
            +"</div>";
        strDetail+="<div class="+"'"+"col-gl-5 col-gl-7 col-md-7 col-sm-12 detail-row"+"'"+">"+obj[i].Cinema+"</div></div>";

        //Room Name:
        strDetail+="<div class="+"'"+"row"+"'"+">"+"<div class="+"'"+"col-gl-5 col-md-5 col-sm-12 detail-row"+"'"+">" + "Room<span>:</span>"
            +"</div>";
        strDetail+="<div class="+"'"+"col-gl-5 col-gl-7 col-md-7 col-sm-12 detail-row"+"'"+">"+obj[i].Room+"</div></div>";

        //Seats Name:
        strDetail+="<div class="+"'"+"row"+"'"+">"+"<div class="+"'"+"col-gl-5 col-md-5 col-sm-12 detail-row"+"'"+">" + "Seat(s)<span>:</span>"
            +"</div>";
        strDetail+="<div class="+"'"+"col-gl-5 col-gl-7 col-md-7 col-sm-12 detail-row"+"'"+">"+obj[i].Seats+"</div></div>";

        //Date & Show Time:
        strDetail+="<div class="+"'"+"row"+"'"+">"+"<div class="+"'"+"col-gl-5 col-md-5 col-sm-12 detail-row"+"'"+">" + "Date & Show Time<span>:</span>"
            +"</div>";
        strDetail+="<div class="+"'"+"col-gl-5 col-gl-7 col-md-7 col-sm-12 detail-row"+"'"+">"+obj[i].Run_Time+"</div></div>";

        //Cinema Address
        strDetail+="<div class="+"'"+"row"+"'"+">"+"<div class="+"'"+"col-gl-5 col-md-5 col-sm-12 detail-row"+"'"+">" + "Cinema Address<span>:</span>"
            +"</div>";
        strDetail+="<div class="+"'"+"col-gl-5 col-gl-7 col-md-7 col-sm-12 detail-row"+"'"+">"+obj[i].Cinema_Address+"</div></div>";
        //console.log(str);

        //Buttons
        strDetail+="<div class="+"'"+"row"+"'"+">"+"<a href="+"'"+"index.php?route=DetailController/editItems/"+i+"'"+" class="+"'"+"btn btn-default btn-booking"+"'"+">Edit"+"</a>"
        +"<button type="+"'"+"button"+"'"+" class="+"'"+"btn btn-default btn-booking delete"+"'"+" value="+"'"+i+"'"+">"+"Delete"+"</button></div>";

        //Item Id:
        strSummary+="<tr><td>Item Number:</td>"+"<td>"+id+"</td>"+"</tr>";

        //ticket cost:
        strSummary+="<tr><td>Ticket Cost(s):</td>"+"<td>$ "+obj[i].Price+"</td>"+"</tr>";

        //Item Tax:
        strSummary+="<tr><td>Service Tax:</td>"+"<td>"+obj[i].Tax+"</td>"+"</tr>";

        //Item Total:
        strSummary+="<tr id="+"'"+"total"+"'"+"><td>Total:</td>"+"<td>"+obj[i].TotalPrice+"</td>"+"</tr>";
        grandPrice+=obj[i].TotalPrice;
        console.log(strDetail);
    }
    //Add film button


        strSummary+="<tr><td>GRAND TOTAL</td><td>$"+grandPrice+"</td><tr/>";
        strSummary+="<tr><td colspan='2'><a href='./index.php'>ADD OTHER FILMS</a></td></tr>";
    //Add pay button
    //strSummary+="<tr><td colspan='2'><a href='./index.php'>PAY NOW</a></td></tr>";

    $(".ticket-booking").html(strDetail);
    $(".booking-table").html(strSummary);
}


//////////////////////////////

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

function paymentButton(){
    $(".stripe-button-el").addClass("btn-payment");
}



init();