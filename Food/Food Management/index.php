<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <link href="../../Assets/css/bootstrap.min.css" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="../../Assets/js/jquery.min.js" ></script>
    <script src="../../Assets/js/bootstrap.min.js" ></script>
    <link rel="stylesheet" type="text/css" href="../../Assets/css/food-shopping-cart.css" />
    <script src="../../Assets/js/Food/food_shopping_cart.js"></script>
</head>

<?php
require_once "../Model/Food.php";
require_once "../Model/FoodDB.php";
require_once "../Model/ShoppingcartDB.php";
session_start();

if(isset($_GET["id"])){
    $food=FoodDB::getFoodById($_GET["id"]);
    $cinemas=FoodDB::getFoodCinema();
    include "food_product.php";
}else if(isset($_POST["action"])){
      if($_POST["action"]=="add") {

          $count = ShoppingcartDB::insertItemById($_POST['foodId'], 7, $_POST['quantity'], $_POST['size'], $_POST['cinema']);
      }
}
?>

</html>
