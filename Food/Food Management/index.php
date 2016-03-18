<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link href="../../Assets/css/bootstrap.min.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="../../Assets/js/jquery.min.js" ></script>
    <script src="../../Assets/js/bootstrap.min.js" ></script>
    <link rel="stylesheet" type="text/css" href="../../Assets/css/food-shopping-cart.css" />
    <script src="../../Assets/js/food_shopping_cart.js"></script>
</head>

<?php
if(isset($_GET['page'])){
    $page=$_GET['page'];
}else{
    $page="cart_list";
}
if($page=="cart_list"){

    include "food-shopping-cart.php";
}else if($page=="instock"){
    include "food-shopping-cart.php";
}else if($page=="price"){
    include "food-shopping-cart.php";
}else if($page=="order_management"){
    include "Order_Management.php";
}
?>
</html>
