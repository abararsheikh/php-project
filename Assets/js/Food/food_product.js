
$(document).ready(
    function(){
        var oprice=+$('#op').text();
        var save=+$('#save').text();
        var dp=+$('#dp').text();
        $('#small').click(
            function(){
                $('#op').text(oprice);
                $('#save').text(save);
                $('#dp').text(dp);
            }
        );
        $('#middle').click(
            function(){
                $('#op').text(oprice*1.5);
                $('#save').text(save*1.5);
                $('#dp').text(dp*1.5);
            }
        );
        $('#large').click(
            function(){
                $('#op').text(oprice*2);
                $('#save').text(save*2);
                $('#dp').text(dp*2);
            }
        );
        $("#p").click(function(){
            console.log($('#stock').text());

            if(Math.floor($('#enter').val()) == $('#enter').val()&&$.isNumeric($('#enter').val())
                &&$("#enter").val()<(+$('#stock').text())) {

                $("#enter").val(+$("#enter").val() + (+1));
            }else{
                $("#enter").val(1);
            }
        });
        $("#m").click(function(){
            if(Math.floor($('#enter').val()) == $('#enter').val()&&$.isNumeric($('#enter').val())
                &&$("#enter").val()>1 ) {
                $("#enter").val($("#enter").val() - 1);
            }else{
                $("#enter").val(1);
            }
        });
        $("#enter").focusout(function(){


            if(!(Math.floor($('#enter').val()) == $('#enter').val())||!($.isNumeric($('#enter').val()))||
                $("#enter").val()>(+$('#stock').text())||$("#enter").val()<1){
                $("#enter").val(1);
            }
        });

        $.getJSON("getComment.php",{id:$('#foodId').val()})
            .done(function(data){

                $("#ac").after(Object.keys(data).length);
              if(Object.keys(data).length!=0) {
                  var good=0;
                  var soso=0;
                  var bad=0;
                  $.each(data, function (index, value) {

                      $("#usercomment").append(
                          '<div class="row" style="border-bottom: solid 1px orange;margin-bottom: 20px;padding-bottom:20px;">' +
                          '<div class="col-md-6 col-sm-8">' +
                          '<p>' + value.Comment + '</p>' +
                          '<div>' + value.Date + '</div>' +
                          '</div>' +
                          '<div class="col-md-2 col-sm-2"><p>Size:</p></div>' +
                          '<div class="col-md-2 col-sm-2">Username: ' + value.username + '</div>' +
                          '</div>');
                      if(value.Evaluation==1){
                          good++;
                      }else if(value.Evaluation==2){
                          soso++
                      }else if(value.Evaluation==3){
                          bad++;
                      }

                  });
                  $('#good').next().text(good);
                  $('#soso').next().text(soso);
                  $('#bad').next().text(bad);
              }else{

                  $("#usercomment").append("<p><h4>No comment.</h4></p>");
                  $('#good').next().text(0);
                  $('#soso').next().text(0);
                  $('#bad').next().text(0);
              }
              $('#good').on("click",function(){
                   $("#usercomment").empty();
                   $.each(data,function(index,value){

                       if(value.Evaluation==1){
                           $("#usercomment").append('<div class="row" style="border-bottom: solid 1px orange;margin-bottom: 20px;padding-bottom:20px;">' +
                               '<div class="col-md-6 col-sm-8">' +
                               '<p>' + value.Comment + '</p>' +
                               '<div>' + value.Date + '</div>' +
                               '</div>' +
                               '<div class="col-md-2 col-sm-2"><p>Size:</p></div>' +
                               '<div class="col-md-2 col-sm-2">Username: ' + value.username + '</div>' +
                               '</div>');
                       }
                   });}
                );
                $('#soso').on("click",function(){
                    $("#usercomment").empty();
                    $.each(data,function(index,value){

                        if(value.Evaluation==2){
                            $("#usercomment").append('<div class="row" style="border-bottom: solid 1px orange;margin-bottom: 20px;padding-bottom:20px;">' +
                                '<div class="col-md-6 col-sm-8">' +
                                '<p>' + value.Comment + '</p>' +
                                '<div>' + value.Date + '</div>' +
                                '</div>' +
                                '<div class="col-md-2 col-sm-2"><p>Size:</p></div>' +
                                '<div class="col-md-2 col-sm-2">Username: ' + value.username + '</div>' +
                                '</div>');
                        }
                    });}
                );
                $('#bad').on("click",function(){
                    $("#usercomment").empty();
                    $.each(data,function(index,value){

                        if(value.Evaluation==3){
                            $("#usercomment").append('<div class="row" style="border-bottom: solid 1px orange;margin-bottom: 20px;padding-bottom:20px;">' +
                                '<div class="col-md-6 col-sm-8">' +
                                '<p>' + value.Comment + '</p>' +
                                '<div>' + value.Date + '</div>' +
                                '</div>' +
                                '<div class="col-md-2 col-sm-2"><p>Size:</p></div>' +
                                '<div class="col-md-2 col-sm-2">Username: ' + value.username + '</div>' +
                                '</div>');
                        }
                    });}
                );
                $('#all').on("click",function(){
                    $("#usercomment").empty();
                    $.each(data,function(index,value){


                            $("#usercomment").append('<div class="row" style="border-bottom: solid 1px orange;margin-bottom: 20px;padding-bottom:20px;">' +
                                '<div class="col-md-6 col-sm-8">' +
                                '<p>' + value.Comment + '</p>' +
                                '<div>' + value.Date + '</div>' +
                                '</div>' +
                                '<div class="col-md-2 col-sm-2"><p>Size:</p></div>' +
                                '<div class="col-md-2 col-sm-2">Username: ' + value.username + '</div>' +
                                '</div>');

                    });}
                );
            });
     /*  $('#add').on("click",function(){
           $.post("index.php");
       });*/

                              $('#add').click(function(e){

                                  e.preventDefault();
                      console.log($('#foodId').val());
                                  console.log($("[name='cinema']").val());
                                  console.log($('#enter').val());
                                  console.log($("[name='size']:checked").val());

                                  $.post("index.php",{action:"add",foodId:$('#foodId').val(),quantity:$('#enter').val(),
                                      size:$("[name='size']:checked").val(),cinema:$("[name='cinema']").val()
                                  },function(data){

                                  });
                              });

    }
);