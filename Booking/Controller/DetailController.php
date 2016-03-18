<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 3/17/2016
 * Time: 12:56 AM
 */

class DetailController{
    public function __construct(){
        echo "This is DetailController";

    }

    public function index(){
        echo "This is index function ";

       if( !\Project\Auth\models\AuthModel::getUser()){
           echo "you should log in first";
       }else{
           //var_dump(\Project\Auth\models\AuthModel::getUser());
           if(isset($_POST["OrderInfo"])&& isset($_POST["seatsNums"])){
               $bookingInfo = explode("| ",$_POST["OrderInfo"]);
               $seats =explode(" ",$_POST["seatsNums"]);
//               $bookInfo = [];
//               $bookInfo["Run_Time"]= $bookingInfo[0];
//               $bookInfo["Film_Name"] =$bookingInfo[1];
//               $bookInfo["Cinema"] =$bookingInfo[2];
//               $bookInfo["Room"] = $bookingInfo[3];
//               $bookInfo["Cinema_Address"] = $bookingInfo[4];
//               $bookInfo["Room_ID"] = $bookingInfo[5];
//               $bookInfo["Seats"] = $_POST["seatsNums"];
//               var_dump($bookInfo);

               $bookInfo = new stdClass();
               $bookInfo->Run_Time= $bookingInfo[0];
               $bookInfo->Film_Name =$bookingInfo[1];
               $bookInfo->Cinema =$bookingInfo[2];
               $bookInfo->Room = $bookingInfo[3];
               $bookInfo->Cinema_Address = $bookingInfo[4];
               $bookInfo->Room_ID = $bookingInfo[5];
               $bookInfo->Seats = $_POST["seatsNums"];
               $cart = new ShoppingCart();
               $cart->addToCart($bookInfo);
               //$cart->showCart();

              $filmBooking = new FilmBookingModel();

               foreach($seats as $seat) {

                   $sql = "UPDATE seats
                       SET available='N'
                       WHERE Room_ID=:Room_ID AND Run_Time=:Run_Time AND Seat_Name=:Seat_Name";
                   $param = ["Room_ID" => $bookInfo->Room_ID, "Run_Time" => $bookInfo->Run_Time, "Seat_Name"=>$seat];
                   $filmBooking->updateSeats($param, $sql);
                   require_once"./View/Comfirm.php";
               }


           }



       }
    }
}