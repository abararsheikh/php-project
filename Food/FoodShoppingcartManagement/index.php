


<?php
require_once "../Model/Food.php";
require_once "../Model/FoodDB.php";
require_once "../Model/Shoppingcart.php";
require_once "../Model/ShoppingcartDB.php";
session_start();
$page="";
$action="";
//if(isset($_SESSION["user"])) {
if(isset($_GET['action'])){
    $action=$_GET['action'];
}else if(isset($_POST['action'])){
    $action=$_POST['action'];
}else {
    if (isset($_GET['page'])) {
        $page = $_GET['page'];
    } else {
        $page = "cart_list";
    }
}

if($action=="delete"){
    ShoppingcartDB::deleteById($_POST['id']);

}else if($action=="stock"){
 $results= ShoppingcartDB::getLowstock(5,7);
    $cinemas = FoodDB::getFoodCinema();
   include "load.php";

}else if($action=="all"){
    $results = ShoppingcartDB::getCartByUserId(7);
    $cinemas = FoodDB::getFoodCinema();
    include "load.php";

}else if($action=="reduction"){
    $results = ShoppingcartDB::getReduction(7);
    $cinemas = FoodDB::getFoodCinema();
    include "load.php";

}else if($action=="history"){
   $foods=ShoppingcartDB::getHistory(6);

    include "bottomload.php";
}else if($action=="guess"){
    $foods=ShoppingcartDB::getGuess(7,6);
    include "bottomload.php";
}else{
    if ($page == "cart_list") {
        $cart = ShoppingcartDB::getCartByUserId(7);
        $cinemas = FoodDB::getFoodCinema();
        $guess=ShoppingcartDB::getGuess(7,6);
        include "food-shopping-cart.php";
    } else if ($page == "order_management") {
        include "Order_Management.php";
    }

}
?>


