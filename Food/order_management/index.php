<?php
if(isset($_GET["action"])){
    $page=$_GET["action"];
}else if(isset($_POST["action"])){
$page=$_POST["action"];
}else{
    $page="original";
}

if($page=="all"){
    include "show.php";
}else if($page=="payment"){
    include "show.php";
}else if($page=="comment"){
  include "show.php";
}else if($page=="original"){
    include "Order_Management.php";
}