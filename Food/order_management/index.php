
<?php

require_once "../Model/OrderDB.php";
require_once "../Model/ShoppingcartDB.php";


// Start a session, there is no need to add this line if session is active.


$page="";

if(isset($_GET["action"])){
    $page=$_GET["action"];
}else if(isset($_POST["action"])){

$page=$_POST["action"];
}else{

    $page="original";
}
$orderdb=new OrderDB();
if($page=="all"){
    $orders=$orderdb->getAllOrders(7);
    $items=array();
    foreach($orders as $order){
        $item= $orderdb->getItemByOrder($order->Order_id);
        $items[]=$item;

    }

    include "show.php";
}else if($page=="payment"){
    $orders=$orderdb->getUnpaidOrder(7);
    $items=array();
    foreach($orders as $order){
        $item= $orderdb->getItemByOrder($order->Order_id);
        $items[]=$item;

    }
    include "show.php";
}else if($page=="comment"){
  include "show.php";
}else if($page=="original"){

    $orders=$orderdb->getAllOrders(7);
    $items=array();
     foreach($orders as $order){
        $item= $orderdb->getItemByOrder($order->Order_id);
         $items[]=$item;

     }
    $cartnumber=ShoppingcartDB::getCount(7);


    include "Order_Management.php";
}else if($page=="delete"){

    $orderdb->deleteById($_POST["id"]);

}else if($page=="pay"){
    $total=$_POST["total"];
    $id=$_POST["id"];
    $phone=$_POST['phone'];
 include "payment.php";
}else if($page=="paid"){
$orderdb->updateOrder($_GET['total'],1,$_GET['phone'],$_GET['id']);
}

if(isset($_POST["check"])){


   $total=$_POST["total"];
   $orderid= $orderdb->insertOrder(7);

    foreach($_POST["info"] as $item){
       $food= ShoppingcartDB::getItemById($item[0]);

        $orderdb->insertOrderItem($orderid,$item[1],$item[2],$item[3],$item[4],$food);
    }
    $orderdb->updateOrder($total,0,"",$orderid);

}