$(document).ready(
    function(){
        repeat();
 function repeat(){
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
         if((+$('ul.nav p.navbar-text span').html()).toFixed(2)=="0.00"){
             $('#checkout').addClass("disabled");
             $('#checkout').css("background-color","gray");

         }else{
             $('#checkout').removeClass("disabled");
             $('#checkout').css("background-color","salmon");

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
             if((+$('ul.nav p.navbar-text span').html()).toFixed(2)=="0.00"){
                 $('#checkout').addClass("disabled");
                 $('#checkout').css("background-color","gray");
             }else{
                 $('#checkout').removeClass("disabled");
                 $('#checkout').css("background-color","salmon");
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

 }
    $('#lowstock').click(
        function(e){

            e.preventDefault();
            $('#checkout').addClass("disabled");
            $('#checkout').css("background-color","gray");
            $('div.menu ul.nav li').removeClass('active');
            $(this).addClass('active');
           $('#foods table').remove();
            $('div p.navbar-text span').html((0).toFixed(2));
            $.get("index.php",{action:"stock"},function(data){
               $('#foods').html(data);
                repeat();
        });
}
);
        $('#selectall').click(
            function(e){

                e.preventDefault();
                $('#checkout').addClass("disabled");
                $('#checkout').css("background-color","gray");
                $('div.menu ul.nav li').removeClass('active');
                $(this).addClass('active');
                $('#foods table').remove();
                $('div p.navbar-text span').html((0).toFixed(2));
                $.get("index.php",{action:"all"},function(data){
                    $('#foods').html(data);

                    repeat();

                });
            }
        );
        $('#reduction').click(
            function(e){

                e.preventDefault();
                $('#checkout').addClass("disabled");
                $('#checkout').css("background-color","gray");
                $('div.menu ul.nav li').removeClass('active');
                $(this).addClass('active');
                $('#foods table').remove();
                $('div p.navbar-text span').html((0).toFixed(2));
                $.get("index.php",{action:"reduction"},function(data){
                    $('#foods').html(data);

                    repeat();

                });
            }
        );
        $('#history').click(function(e){


            $('.navbottom li').removeClass("active");
            $(this).addClass("active");
            $('#bottomcontent').empty();
            $.get("index.php",{action:"history"},function(data){
                console.log(data);
                $('#bottomcontent').html(data);
            });
        });
        $('#guess').click(function(e){


            $('.navbottom li').removeClass("active");
            $(this).addClass("active");
            $('#bottomcontent').empty();
            $.get("index.php",{action:"guess"},function(data){

                $('#bottomcontent').html(data);
            });
        });

            $('#checkout').addClass("disabled");
        $('#checkout').css("background-color","gray");
/*' <tr>'+
    '<td rowspan="4"><input type="checkbox" class="check"/> </td>'+
                        '<td rowspan="4" ><a href="../Food%20Management/index.php?id=<?php echo $item->Food_id;?>"><img src="../../Assets/image/food/<?php echo $item->Food_Image?>" width="130" height="95"/></a></td>'

                       + '<td rowspan="4"><a href="../Food%20Management/index.php?id=<?php echo $item->Food_id;?>"><?php echo $item->Food_Name;?></a></td>'
                   + '<td rowspan="4">Catatory: <?php echo $item->Food_Catagory;?></td>'
                   + '<td rowspan="4">Cinema:<select>' +
    '</select></td>'+
    '<td rowspan="4" width="150">Size:'+
                    '<select></select>'+
    '</td><td rowspan="4" width="150">'+
                        '<input type="hidden" value="<?php echo $item->Food_Price; ?>"/>'+
                        '<input type="hidden" value="<?php echo $item->Discount_price;?>"/>'+
                        'Original: $<?php if($item->Food_Price!==$item->Discount_price){?><span style="text-decoration:line-through;">'
                   + '</span>'+
                    '<div>Current: $<span></span></div>'+
                    '</td> <td rowspan="4" width="150">'+
                        '<div class="snip"><input type="button" value="-" class="m"/><input type="text" size="1" maxlength="3" class="enter" value="<?php echo $item->Quantity;?>"/><input type="button" value="+" class="p"/>'
                        '<input type="hidden" value="<?php echo $item->Food_Instock;?>"/></div>'
                       + '</td> <td rowspan="4" class="amount">$<span></span></td>'+
                    '<td rowspan="4"> <input type="hidden" value="<?php echo $item->Id;?>" name="id"/>'+
                        '<a href="" name="delete">Delete</a> </td> </tr>'+
                        '<tr></tr><tr></tr> <tr></tr>';
                   /!*
                    <?php if($item->Size==1){ echo $item->Discount_price*$item->Quantity;}
                    else if($item->Size==2){echo $item->Discount_price*$item->Quantity*1.5;}
                    else if($item->Size==3){echo $item->Discount_price*$item->Quantity*2;}?>
                    <?php if($item->Size==1){ echo $item->Food_Price;}else if($item->Size==2){
                    echo $item->Food_Price*1.5;
                    }else if($item->Size==3){
                    echo $item->Food_Price*2;
                    }?>
                    <option class="small" <?php if($item->Size==1){
                        echo "selected";
                    }?>>Small</option>
                    <option class="middle" <?php if($item->Size==2){
                        echo "selected";
                    }?>>Middle</option>
                    <option class="large" <?php if($item->Size==3){
                        echo "selected";
                    }?>>Large</option>*!/

    /!*' <?php
                        foreach($cinemas as $c)
                    { if($item->Cinema_Name==$c["Cinema_Name"]){

                        ?>
                    <option value="<?php echo $item->Cinema_Name;?>" selected><?php echo $item->Cinema_Name;?></option>

                        <?php
                    }else{
                        ?>
                    <option value="<?php echo $c["Cinema_Name"];?>"><?php echo $c["Cinema_Name"];?></option>
                        <?php
                    }

                    }
                    ?>*!/*/

}
);