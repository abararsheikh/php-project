/**
 * Created by ran on 3/11/2016.
 */
function init() {
    //get seats
    seatMap();
    getRooms();
    getDate();
    getRuntime();
}

function seatMap(){
    $(document).on("click", ".btn-time",

        function(){
            console.log($("#Date"));
            var showTime = $(this).text();
            var CinemaID =$(".cinemaNum").val();
            var roomId = $("#Rooms").val();
            var roomName = $( "#Rooms option:selected" ).text();
            var showDate = $( "#Date option:selected" ).text();
            var Time = showDate+' '+showTime+':00';
            var url = "./index.php?route=BookingController/chooseSeats/"+roomId+'/'+Time+'/'+CinemaID;
            console.log(url);
            $.get(url,function(data, status){

                var obj = JSON.parse(data);
                var address = obj.pop();

                console.log(address);
                var filmName = $("#film-title").text();
                var CinemaName = $( ".cinemaNum option:selected" ).text();
                var address = address[0];
                createSeatMap(filmName, CinemaName, address,obj,Time,roomName);
            });
            var $seat = $("#seat");

            $seat.show().animate({top:"10px"}, "fast", function(){
                $(".shadow").animate({opacity:"0.4"},"slow");
            });
        }
    );

    $(".concal").click(
        function(){
            var $seat = $("#seat");
            $seat.animate({top:"-1000px"}, "fast", function(){
                $(".shadow").animate({opacity:"1"},"slow");
            });
        }
    );
}
/*
get room id when dropdownList make a change.
 */

function getRooms(){

    $(".cinemaNum").change(function(){
        var cinemaId = $(this).val();
        var filmId = $("#filmId").val();
        var url = "./index.php?route=BookingController/chooseRoom/"+filmId+'/'+cinemaId;
        console.log(url);
        $.get(url,function(data, status){
           // console.log(data);
           var obj = JSON.parse(data);
            createDropDownListRoom(obj);

        });

    });
}
/*
get the film data;
 */
function getDate(){

    $("#Rooms").change(function(){

        var cinemaId = $(".cinemaNum").val();
        var roomId = $(this).val();
        var filmId = $("#filmId").val();
        var url = "./index.php?route=BookingController/chooseDate/"+filmId+'/'+cinemaId+'/'+roomId;
        console.log(url);
        $.get(url,function(data, status){
            // console.log(data);
            var obj = JSON.parse(data);
            createDropDownListDate(obj);

        });

    });
}

function getRuntime(){

    $("#Date").change(function(){

        var cinemaId = $(".cinemaNum").val();
        var roomId = $(this).val();
        var filmId = $("#filmId").val();

        var url = "./index.php?route=BookingController/chooseTime/"+filmId+'/'+cinemaId+'/'+roomId;
        console.log(url);
        $.get(url,function(data, status){
             console.log(data);
             var obj = JSON.parse(data);
            createButtonListShowTime(obj);

        });

    });
}



function createDropDownListRoom(obj){
    var strRoom="<option value="+'"'+"defualt"+'"'+">"+"select an option"+"</option>";
    var strDate="<option value="+'"'+"defualt"+'"'+">"+"select an option"+"</option>";
   // console.log(obj);
    for(var i=0; i<obj.length; i++){
        console.log(obj[i]);
        strRoom+="<option value="+'"'+obj[i].Room_ID+'"'+">"+obj[i].Room_Name+"</option>";
    }
   // console.log(str);
    $("#Rooms").html(strRoom);
    $("#Date").html(strDate);
    $('#showTime').html('');
}

/*
Create DropDownList for Date
 */
function createDropDownListDate(obj){
    var str="<option value="+'"'+"defualt"+'"'+">"+"select an option"+"</option>";
    //console.log(obj);
    for(var i=0; i<obj.length; i++){
        console.log(obj[i]);
        str+="<option value="+'"'+obj[i].Room_ID+'"'+">"+obj[i].RunDate+"</option>";
    }
    //console.log(str);
    $("#Date").html(str);
    $('#showTime').html('');

}

/*
Create show time button in booking page.
 */

function createButtonListShowTime(obj){
    var strButton="";
    //console.log(obj);
    for(var i=0; i<obj.length; i++){
        console.log(obj[i]);
        strButton+="<button type="+'"'+"button"+'"'+" class="+'"'+'btn'+' btn-time'+'"'+ ">"+obj[i].RunTime+"</button>";
    }
   // console.log(strButton);
    $("#showTime").html(strButton);
   // console.log($("#booking"));
}

/*
    createSeatMap
 */
function createSeatMap(filmName, CinemaName,address,obj,Time,roomName){
    var orderInfo = Time +'| '+filmName+"| "+CinemaName+"| "+roomName+": "+address.Cinema_Address;
    $("#OrderInfo").html(orderInfo);
    //get rows
    var rows=[];
    for(var i=0; i<obj.length; i++){
        var reg = /\D*/;

        //console.log(obj[i]);
        var str = obj[i].Seat_Name;
        str = reg.exec(str);
        rows[i] =str[0];
    }
    //console.log(rows);
    var row=[];
    $.each(rows, function(i, el){
        if($.inArray(el, row) === -1) row.push(el);
    });
    console.log(row);
    var colNum =5;
    createSeats(row,colNum,obj);
}

function createSeats(rows,colNum, obj){
    for(var i=0; i<rows.length; i++){
        
    }
}
init();

