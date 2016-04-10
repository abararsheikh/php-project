$(document).ready(

function(){

  $('#checkall').click(function(){
        $('.check').prop("checked",$('#checkall').prop("checked"));
      var checks= $('input:checkbox').not(this).parent().parent().toArray();
         if($(this).prop('checked')==true){
             console.log(checks);
             var total=0;
             $.each(checks,function(index,value){

                total+= (+$(this).find('.amount span').text());
             });
             $('.navbar-text').find('span').text((total).toFixed(2));
         }else{
             $('.navbar-text').find('span').text((0.00).toFixed(2));
         }
    });
  /*  function Instock() {

        $.get("../../Food/Food Management/Instock.php",function(){
            $('#foods').html("");
            var phpdoc=$(this);
            $('#foods').append(phpdoc);
        },"php");
    }*!/
*/
  $(".p").click(function(){
        var instock=$(this).next().val();

        if(Math.floor($(this).prev().val()) == $(this).prev().val()&&$.isNumeric($(this).prev().val())
            &&$(this).prev().val()<(+instock)) {

            $(this).prev().val(+$(this).prev().val() + (+1));
        }else{
            $(this).prev().val(1);
        }

      if($(this).parent().parent().parent().find('td input:checkbox').prop('checked')==true) {

          $('.navbar-text').find('span').text((+$('.navbar-text').find('span').text())-
              (+$(this).parent().parent().parent().find('td.amount span').text()));

          $('.navbar-text').find('span').text(((+$('.navbar-text').find('span').text()) +
          ((+$(this).prev().val())*(+$(this).parent().parent().prev().find('div span').text()))).toFixed(2));
      }
      $(this).parent().parent().next().find('span').html("");
      $(this).parent().parent().next().find('span').text(((+$(this).parent().parent().prev().find('span').last().text())*(+$(this).prev().val())).toFixed(2));
    });
    $(".m").click(function(){

        if(Math.floor($(this).next().val()) == $(this).next().val()&&$.isNumeric($(this).next().val())
            &&$(this).next().val()>1 ) {
            $(this).next().val($(this).next().val() - 1);
        }else{
            $(this).next().val(1);
        }
        if($(this).parent().parent().parent().find('td input:checkbox').prop('checked')==true) {

            $('.navbar-text').find('span').text((+$('.navbar-text').find('span').text())-
                (+$(this).parent().parent().parent().find('td.amount span').text()));

            $('.navbar-text').find('span').text(((+$('.navbar-text').find('span').text()) +
            ((+$(this).next().val())*(+$(this).parent().parent().prev().find('div span').text()))).toFixed(2));
        }
        $(this).parent().parent().next().find('span').html("");
        $(this).parent().parent().next().find('span').text(((+$(this).parent().parent().prev().find('span').last().text())*(+$(this).next().val())).toFixed(2));
    });
    $(".enter").focusout(function(){
        var instock=$(this).next().next().val();

        if(!(Math.floor($(this).val()) == $(this).val())||!($.isNumeric($(this).val()))||
            $(this).val()>(+instock)||$(this).val()<1){
            $(this).val(1);
        }
        if($(this).parent().parent().parent().find('td input:checkbox').prop('checked')==true) {

            $('.navbar-text').find('span').text((+$('.navbar-text').find('span').text())-
                (+$(this).parent().parent().parent().find('td.amount span').text()));

            $('.navbar-text').find('span').text(((+$('.navbar-text').find('span').text()) +
            ((+$(this).val())*(+$(this).parent().parent().prev().find('div span').text()))).toFixed(2));
        }
        $(this).parent().parent().next().find('span').html("");
        $(this).parent().parent().next().find('span').text(((+$(this).parent().parent().prev().find('span').last().text())*(+$(this).val())).toFixed(2));
    });



    $('select').change(function(){
        var original=$(this).parent().next().find('input').first().val();
        var current=$(this).parent().next().find('input').last().val();
        var quantity=$(this).parent().parent().find('input.enter').val();

        if($(this).find('option:selected').text()=="Small"){


            $(this).parent().next().find('span').first().text(original);
            $(this).parent().next().find('span').last().text(current);
            if($(this).parent().parent().find('td input:checkbox').prop('checked')==true) {

                $('.navbar-text').find('span').text((+$('.navbar-text').find('span').text())-
                    (+$(this).parent().parent().find('td.amount span').text()));
                console.log($('.navbar-text').find('span').text());
                $('.navbar-text').find('span').text(((+$('.navbar-text').find('span').text()) + ((+current) * (+quantity))).toFixed(2));
            }
            $(this).parent().parent().find('td.amount span').text(((+current)*(+quantity)).toFixed(2));

        }else if($(this).find('option:selected').text()=="Middle"){
            $(this).parent().next().find('span').first().text((+original)*1.5);
            $(this).parent().next().find('span').last().text((+current)*1.5);
            if($(this).parent().parent().find('td input:checkbox').prop('checked')==true) {

                $('.navbar-text').find('span').text((+$('.navbar-text').find('span').text())-
                    (+$(this).parent().parent().find('td.amount span').text()));
                console.log($('.navbar-text').find('span').text());
                $('.navbar-text').find('span').text(((+$('.navbar-text').find('span').text()) + ((+current) * (+quantity)*1.5)).toFixed(2));
            }
            $(this).parent().parent().find('td.amount span').text(((+current)*(+quantity)*1.5).toFixed(2));

        }else if($(this).find('option:selected').text()=="Large"){
            $(this).parent().next().find('span').first().text((+original)*2);
            $(this).parent().next().find('span').last().text((+current)*2);
            if($(this).parent().parent().find('td input:checkbox').prop('checked')==true) {

                $('.navbar-text').find('span').text((+$('.navbar-text').find('span').text())-
                    (+$(this).parent().parent().find('td.amount span').text()));
                console.log($('.navbar-text').find('span').text());
                $('.navbar-text').find('span').text(((+$('.navbar-text').find('span').text()) + ((+current) * (+quantity)*2)).toFixed(2));
            }
            $(this).parent().parent().find('td.amount span').text(((+current)*(+quantity)*2).toFixed(2));

        }

    });
    $('input:checkbox').not('#checkall').click(
        function(){


            if($(this).prop("checked")==true){

                $('.navbar-text').find('span').text( ((+$('.navbar-text').find('span').text())+
                    (+$(this).parent().parent().find('.amount span').text())).toFixed(2));
            }else{
                $('#checkall').prop("checked",false);
                $('.navbar-text').find('span').text( ((+$('.navbar-text').find('span').text())-
                    (+$(this).parent().parent().find('.amount span').text())).toFixed(2));
            }
        }
    );

   $("[name='delete']").click(
       function(e){
           e.preventDefault();


           $.post("index.php",{action:"delete",id:$(this).prev().val()});
           if($(this).parent().parent().find('.check').prop("checked")==true) {
               $('.navbar-text span').text(
                   ((+$('.navbar-text span').text()) -
                   (+$(this).parent().parent().find('.amount span').text())).toFixed(2));
           }

           $(this).parent().parent().remove();
       }
   );
     $("").change(

     );

}
);