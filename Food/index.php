
<?php

session_start();
require "Model/FoodDB.php";
require_once "Model/Food.php";
require_once "Model/ShoppingcartDB.php";
if(isset($_POST["page"])){
    $page=$_POST["page"];
}else if(isset($_GET["page"])){
    $page=$_GET["page"];
}else{
    $page="all";
}
if(isset($_GET["action"])){
    if($_GET["action"]=="plus"){
      echo  ShoppingcartDB::plus(7,$_GET["foodid"]);
    }
}else if(isset($_GET["search"])){
    $foods= FoodDB::search($_GET["search"]);

    echo $foods;
}else
{
    if ($page == "all") {
        $foods = FoodDB::getAll();
        $foods = json_decode($foods);

        $topfoods = FoodDB::getTopFoods(5);
        $pages = FoodDB::pages($foods);
        $cartnumber=ShoppingcartDB::getCount(7);

        include "Food_Menu.php";
    } else if ($page == "allFoods") {
        $foods = FoodDB::getAll();

        echo $foods;
        //  include "Food Management/show.php";

    } else {
        $foods = FoodDB::getFoodsByCatagory($page);

        echo $foods;
    }
}
