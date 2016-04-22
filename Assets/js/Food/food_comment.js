$(document).ready(
    function(){
        $('.rating > span').css("cursor","pointer");
        var mark;
        $('.rating > span').click(function(){
            $('.rating > span').removeClass('changed');

            $(this).addClass('changed');
            $(this).nextAll().addClass('changed');

            mark=5-$(this).index();
        });
        $('[type="submit"]').click(function(e){
            e.preventDefault();
            var action=$(this).prev().val();
            var id=$(this).prev().prev().val();
            var orderitemid=$(this).prev().prev().prev().val();
            var file=$('[type="file"]').val();
            var satisfaction=$('[name="satisfaction"]').val();
            var comment=$('[name="comment"]').val();
            console.log(satisfaction);
            console.log(mark);
            if(satisfaction==null||mark ==null){
                alert("Please choose Mark or Satisfaction!");
            }else {
                $.post("index.php", {
                        mark: mark,
                        orderitemid: orderitemid,
                        action: action,
                        foodid: id,
                        file: file,
                        satisfaction: satisfaction,
                        comment: comment
                    },
                    function (data) {

                       window.location.href="../order_management/index.php";
                    })
            }
        });
    }
);
