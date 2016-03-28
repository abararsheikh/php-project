/**
 * Created by ran on 3/23/2016.
 */

function init(){
    chooseCalender();
    findEnglishMovie();
    findChineseMovie();
    findAllMovie();

}

function chooseCalender(){
    $(".list-unstyled").on("click","label", function(){
        $(this).toggleClass("unchecked");
        $(this).prev().prop("checked", !$(this).prev().prop("checked"));
    });
}
function findChineseMovie(){
    $("#ChineseMovies").click(function(){
        url="../MovieCalender/index.php?route=CustomerCalender/showChineseMovies";
        $.get(url,function(data,status){
            data = JSON.parse(data);
            console.log(data);
            createList(data);
        })
    });
}

function findAllMovie(){
    $("#allMovies").click(function(){
        url="../MovieCalender/index.php?route=CustomerCalender/showAllMovies";
        $.get(url,function(data,status){
            data = JSON.parse(data);
            console.log(data);
            createList(data);
        })
    })
}

function findEnglishMovie(){
    $("#EnglishMovies").click(function(){
        url="../MovieCalender/index.php?route=CustomerCalender/showEnglishMovies";
        $.get(url, function(data,status){
                data = JSON.parse(data);
                console.log(data);
                createList(data);
        })
    });
}

function createList(data){
   var str="";
    for(var i=0; i<data.length; i++){
        str+= "<li class='movieList'>";
        str+="<input type='checkbox' name='runningfilmId[]' class='film-list' value="+"'"+data[i].Film_Id+"'"+" checked/>";
        str+="<label for='runningfilmId[]' class='checked'>"+data[i].Film_Name+"</label>";
        str+="<small>["+data[i].Run_Time+"]</small></li>";
    }
    $("#filmList").html(str);
}
init();