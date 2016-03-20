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

       if( !\Project\Auth\models\AuthModel::getUser()){
           echo "you should log in first";
       }else{
           //var_dump(\Project\Auth\models\AuthModel::getUser());



           if(isset($_POST["OrderInfo"])&& isset($_POST["seatsNums"]) &&isset($_POST["filmId"])){
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
                $price = $_POST["price"];
                $tax = 0.13;
                $totalPrice = (1+$tax)*$price;
               $bookInfo = new stdClass();
               $bookInfo->Run_Time= $bookingInfo[0];
               $bookInfo->Film_Name =$bookingInfo[1];
               $bookInfo->Cinema =$bookingInfo[2];
               $bookInfo->Room = $bookingInfo[3];
               $bookInfo->Cinema_Address = $bookingInfo[4];
               $bookInfo->Room_ID = $bookingInfo[5];
               $bookInfo->Seats = $_POST["seatsNums"];
               $bookInfo->TotalPrice = $totalPrice;
               $bookInfo->Price = $price;
               $bookInfo->Tax =$tax;
               $bookInfo->FilmId = $_POST["filmId"];
               $bookInfo->Cinema_ID = $_POST["Cinema"];
               $bookInfo->showDate = $bookingInfo[6];
               $bookInfo->showTime = $bookingInfo[7];
               $cart = new ShoppingCart();
               $itemId = trim($_POST["itemId"]);
               var_dump($itemId);

               //$cart->showCart();

              $filmBooking = new FilmBookingModel();
                //check database first
               foreach($seats as $seat){
                   $sql = "SELECT Seat_Name, available
                           From seats WHERE Room_ID=:Room_ID AND Run_Time=:Run_Time AND Seat_Name=:Seat_Name";
                   $param = ["Room_ID" => $bookInfo->Room_ID, "Run_Time" => $bookInfo->Run_Time, "Seat_Name"=>$seat];
                   $seatInfo = $filmBooking->getBookingDetail($param,$sql);
                   if(!is_array($seatInfo)) {
                       if ($seatInfo[0]->available == 'N') {
                           // require_once"./View/Error404.php";
                           self::seatsOccupied($bookInfo);
                           exit();
                       };
                   }
               }



               if($itemId!=""){
                   echo"Item id not null";
                   $cart-> updateCartByItemId($itemId,$bookInfo);
               }else {
                   $cart->addToCart($bookInfo);
               }

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

    public function deleteItems($item_id){
        //echo $item_id;
        $cart = new ShoppingCart();
        $filmBooking = new FilmBookingModel();
        $item=$cart->getItemById($item_id);
        $seats =  explode(" ",$item->Seats);
        foreach($seats as $seat) {
            $sql = "UPDATE seats
                       SET available='Y'
                       WHERE Room_ID=:Room_ID AND Run_Time=:Run_Time AND Seat_Name=:Seat_Name";
            $param = ["Room_ID" => $item->Room_ID, "Run_Time" => $item->Run_Time, "Seat_Name"=>$seat];
            $filmBooking->updateSeats($param, $sql);
        }
        $cart->deleteItem($item_id);


       echo json_encode($cart->shoppingCart->data);
    }

    public function editItems($item_id){
        $cart = new ShoppingCart();
        $filmBooking = new FilmBookingModel();
        $cart->showCart();
        $item=$cart->getItemById($item_id);
        $seats =  explode(" ",$item->Seats);
        foreach($seats as $seat) {
            $sql = "UPDATE seats
                       SET available='Y'
                       WHERE Room_ID=:Room_ID AND Run_Time=:Run_Time AND Seat_Name=:Seat_Name";
            $param = ["Room_ID" => $item->Room_ID, "Run_Time" => $item->Run_Time, "Seat_Name"=>$seat];
            $filmBooking->updateSeats($param, $sql);
        }

        //var_dump($item);

        $sql = "SELECT DISTINCT(rooms.Room_Name), rooms.Room_ID,DATE_FORMAT(Run_Time, '%H:%i') AS 'RunTime'
                              FROM films JOIN running_films
                                          ON films.Film_Id = running_films.Film_Id
                                         JOIN rooms
                                         ON running_films.Room_ID = rooms.Room_ID
                                         JOIN cinemas
                                         ON cinemas.Cinema_ID = rooms.Cinema_ID
                                         WHERE running_films.Film_Id=:Film_Id AND cinemas.Cinema_ID=:Cinema_ID
                                          AND rooms.Room_ID=:Room_Id
                                         ORDER BY DATE_FORMAT(Run_Time, '%H:%i')";
        $TimeInfos = $filmBooking->getBookingDetail($para=["Film_Id"=>$item->FilmId, "Cinema_ID"=>$item->Cinema_ID,"Room_Id"=>$item->Room_ID],$sql);

        $sql = "SELECT Seat_Name, available
                From seats WHERE Room_ID=:Room_ID AND Run_Time=:Run_Time";

        $SeatsInfos = $filmBooking->getBookingDetail($para=["Room_ID"=>$item->Room_ID, "Run_Time"=>$item->Run_Time],$sql);

        $filmInfo = $filmBooking->getFilmById($item->FilmId);
        $SeatsInfos= json_encode($SeatsInfos);
        //var_dump($TimeInfos);
        require_once "./View/Booking.php";
    }

    static function seatsOccupied($item){
        $ErrorMessage = "<b style='color:red'>Some Seats have already been ordered !!!</b>";
        $filmBooking = new FilmBookingModel();
        $sql = "SELECT DISTINCT(rooms.Room_Name), rooms.Room_ID,DATE_FORMAT(Run_Time, '%H:%i') AS 'RunTime'
                              FROM films JOIN running_films
                                          ON films.Film_Id = running_films.Film_Id
                                         JOIN rooms
                                         ON running_films.Room_ID = rooms.Room_ID
                                         JOIN cinemas
                                         ON cinemas.Cinema_ID = rooms.Cinema_ID
                                         WHERE running_films.Film_Id=:Film_Id AND cinemas.Cinema_ID=:Cinema_ID
                                          AND rooms.Room_ID=:Room_Id
                                         ORDER BY DATE_FORMAT(Run_Time, '%H:%i')";
        $TimeInfos = $filmBooking->getBookingDetail($para=["Film_Id"=>$item->FilmId, "Cinema_ID"=>$item->Cinema_ID,"Room_Id"=>$item->Room_ID],$sql);

        $sql = "SELECT Seat_Name, available
                From seats WHERE Room_ID=:Room_ID AND Run_Time=:Run_Time";

        $SeatsInfos = $filmBooking->getBookingDetail($para=["Room_ID"=>$item->Room_ID, "Run_Time"=>$item->Run_Time],$sql);
        $filmInfo = $filmBooking->getFilmById($item->FilmId);
        $SeatsInfos= json_encode($SeatsInfos);
        require_once "./View/Booking.php";
    }
}

