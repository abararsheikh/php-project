$(document).ready(

    function(){

        $("ul li").click(function(event) {
                event.preventDefault();
                $(".table-responsive").empty();
               $("ul li").removeClass("active");
            $(this).addClass("active");
                $.get(
                    'index.php',
            {action:$(this).attr("id")})
            .done(function(data){


         $(".table-responsive").html(data);
            });

        }

        );
      $('.pay').click(function(){
          var orderid=(+$(this).parent().parent().find('td.order span').text());

      });

        $('a.deleteitem').click(function(e){
            e.preventDefault();

            var id=(+$(this).parent().parent().find('td.order span').text());
            console.log(id);
            $.post("index.php",{action:"delete",id:id},function(data){


            });
            $(this).parent().parent().remove();

$('.idhide').each(function(){
    if((+$(this).val())==id){
        $(this).parent().parent().remove();
    }
});


        });
    });


