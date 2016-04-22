


<?php
require_once "../Model/Food.php";
require_once "../Model/FoodDB.php";
require_once "../Model/ShoppingcartDB.php";
session_start();

if(isset($_GET["id"])){
    $food=FoodDB::getFoodById($_GET["id"]);
    $cinemas=FoodDB::getFoodCinema();
   $mark=FoodDB::calculateMark($_GET["id"]);
FoodDB::setHistory($_GET["id"]);
    $cartnumber=ShoppingcartDB::getCount(7);
    include "food_product.php";
}else if(isset($_POST["action"])){
      if($_POST["action"]=="add") {

          $count = ShoppingcartDB::insertItemById($_POST['foodId'], 7, $_POST['quantity'], $_POST['size'], $_POST['cinema']);
      }else if($_POST["action"]=="insertcomment"){

             $count = FoodDB::insertCommentById($_POST["orderitemid"], $_POST["foodid"], $_POST["comment"], $_POST["mark"],
                 $_POST["satisfaction"], $_POST["file"],7);

      }
}else if(isset($_GET["foodid"])){
    $food=FoodDB::getFoodById($_GET["foodid"]);
    $cartnumber=ShoppingcartDB::getCount(7);
    include "CommentForm.php";
}
?>

