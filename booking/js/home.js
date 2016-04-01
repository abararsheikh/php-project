/**
 * Created by ran on 3/19/2016.
 */
function init(){
    chooseCinema();
    getRooms();
    getDate();
    getRuntime();
    //filmInfo();
    submitBooking();
}

function chooseCinema(){
    $(".films").change(function(){
        var filmId = $(this).val();
        var url = "/booking/index.php?route=HomePageController/chooseCinema/"+filmId;
        console.log(url);
        $.get(url,function(data, status){
           // console.log(data);
            var obj = JSON.parse(data);
            createDropDownListCinema(obj);

        });

    });
}

function submitBooking (){
    $("#submitbooking").click(function(){
        filmInfo();
    });
}


function createDropDownListCinema(obj){
    var strCinema="<option value="+'"'+"default"+'"'+">"+"Select Cinema"+"</option>";
    var strRoom="<option value="+'"'+"default"+'"'+">"+"Select Room"+"</option>";
    var strDate="<option value="+'"'+"default"+'"'+">"+"Select Date"+"</option>";
    var strTime="<option value="+'"'+"default"+'"'+">"+"Select Time"+"</option>";

     //console.log(obj);
    for(var i=0; i<obj.length; i++){
        //console.log(obj[i]);
        strCinema+="<option value="+'"'+obj[i].Cinema_ID+'"'+">"+obj[i].Cinema_Name+"</option>";
    }
     //console.log(strCinema);
    $("#Cinemas").html(strCinema);
    $("#Rooms").html(strRoom);
    $("#Date").html(strDate);
    $('#showTime').html(strTime);
}


function getRooms(){

    $("#Cinemas").change(function(){
        var cinemaId = $(this).val();
        var filmId = $(".films").val();
        var url = "/booking/index.php?route=HomePageController/chooseRoom/"+filmId+'/'+cinemaId;
        console.log(url);
        $.get(url,function(data, status){
           // console.log(data);
            var obj = JSON.parse(data);
            createDropDownListRoom(obj);

        });

    });
}

function createDropDownListRoom(obj){
    var strRoom="<option value="+'"'+"default"+'"'+">"+"Select Room"+"</option>";
    var strDate="<option value="+'"'+"default"+'"'+">"+"Select Date"+"</option>";
    var strTime="<option value="+'"'+"default"+'"'+">"+"Select Time"+"</option>";
    // console.log(obj);
    for(var i=0; i<obj.length; i++){
       //console.log(obj[i]);
        strRoom+="<option value="+'"'+obj[i].Room_ID+'"'+">"+obj[i].Room_Name+"</option>";
    }
    // console.log(str);
    $("#Rooms").html(strRoom);
    $("#Date").html(strDate);
    $("#showTime").html(strTime);
}


function getDate(){

    $("#Rooms").change(function(){

        var cinemaId = $("#Cinemas").val();
        var roomId = $(this).val();
        var filmId = $(".films").val();
        var url = "./index.php?route=HomePageController/chooseDate/"+filmId+'/'+cinemaId+'/'+roomId;
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

        var cinemaId = $("#Cinemas").val();
        var roomId = $("#Rooms").val();
        var filmId = $(".films").val();

        var url = "./index.php?route=HomePageController/chooseTime/"+filmId+'/'+cinemaId+'/'+roomId;
        console.log(url);
        $.get(url,function(data, status){
           // console.log(data);
            var obj = JSON.parse(data);
            createDropDownListShowTime(obj);

        });

    });
}

function createDropDownListShowTime(obj){
    var str="<option value="+'"'+"default"+'"'+">"+"Select Time"+"</option>";

    //console.log(obj);


    for(var i=0; i<obj.length; i++){
        console.log(obj[i]);
        //str+="<button type="+'"'+"button"+'"'+" class="+'"'+'btn'+' btn-time'+'"'+ ">"+obj[i].RunTime+"</button>";
        str+="<option value="+'"'+obj[i].RunDate+'"'+">"+obj[i].RunTime+"</option>";
    }
    // console.log(str);
    $("#showTime").html(str);


    // console.log($("#booking"));
}
function filmInfo(){
    var FilmName = $(".films option:selected").text();
    var CinemaName = $("#Cinemas option:selected").text();
    var RoomName = $("#Rooms option:selected").text();
    var showDate = $("#Date option:selected").text();
    var showtime =$("#showTime option:selected").text();
    var Time = showDate+" "+showtime+":00";
    var FilmInfo =FilmName+"| " +CinemaName+"| "+RoomName+"| "+showDate+"| "+showtime+"| "+Time;
    console.log(FilmInfo);
    $("#filmInfo").val(FilmInfo);
}

function createDropDownListDate(obj){
    var strDate="<option value="+'"'+"default"+'"'+">"+"Select Date"+"</option>";
    var strTime="<option value="+'"'+"default"+'"'+">"+"Select Time"+"</option>";
    //console.log(obj);
    for(var i=0; i<obj.length; i++){
        //console.log(obj[i]);
        strDate+="<option value="+'"'+obj[i].Room_ID+'"'+">"+obj[i].RunDate+"</option>";
    }
    //console.log(str);
    $("#Date").html(strDate);
    $("#showTime").html(strTime);

}


init();