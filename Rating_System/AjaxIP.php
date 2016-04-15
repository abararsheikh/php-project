<html>

<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
    $(document).ready(function(){
    $.getJSON('getLocalIP.php', function (data) {
        var result ="<ul>";
        $.each(data, function(index,product){
            result += "<li>" + product.category + " : " + product.productName + "</li>";
        });
        result += "</ul>";

        $('#book').html(result);
    });
    });
</script>
<body>
<div id="book"></div>
</body>
</html>