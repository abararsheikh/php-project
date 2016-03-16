<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 3/11/2016
 * Time: 10:51 PM
 */

class BookingController{
    public function __construct(){
        echo "This is Booking Controller <br/>";
    }

    public function index(){
        //echo "this is index method in booking controller";
        $getFilmInfo = new FilmBookingModel();
        if(isset($_POST['filmId'])) {
            //
            $filmId = $_POST['filmId'];
            $sql = "SELECT DISTINCT(rooms.Room_Name)
                              FROM films JOIN running_films
                                          ON films.Film_Id = running_films.Film_Id
                                         JOIN rooms
                                         ON running_films.Room_ID = rooms.Room_ID
                                         JOIN cinemas
                                         ON cinemas.Cinema_ID = rooms.Cinema_ID
                                         WHERE running_films.Film_Id=:Film_Id;";
            $RoomInfos = $getFilmInfo->getBookingInfo($filmId, $sql);
            require_once "./View/Booking.php";
        }
        else{
            require_once "./View/Error404.php";
        }
    }

    public function chooseRoom($filmId,$cinemaId){
        $getFilmInfo = new FilmBookingModel();

        $sql = "SELECT DISTINCT(rooms.Room_Name), rooms.Room_ID
                              FROM films JOIN running_films
                                          ON films.Film_Id = running_films.Film_Id
                                         JOIN rooms
                                         ON running_films.Room_ID = rooms.Room_ID
                                         JOIN cinemas
                                         ON cinemas.Cinema_ID = rooms.Cinema_ID
                                         WHERE running_films.Film_Id=:Film_Id AND cinemas.Cinema_ID=:Cinema_ID
                                         ORDER BY rooms.Room_Name";
        $RoomInfos = $getFilmInfo->getBookingDetail($para=["Film_Id"=>$filmId, "Cinema_ID"=>$cinemaId],$sql);
        echo json_encode($RoomInfos);

    }

    public function chooseDate($filmId, $cinemaId, $roomId){
        $getFilmInfo = new FilmBookingModel();

        $sql = "SELECT DISTINCT(rooms.Room_Name), rooms.Room_ID,DATE_FORMAT(Run_Time, '%Y-%m-%d') AS 'RunDate'
                              FROM films JOIN running_films
                                          ON films.Film_Id = running_films.Film_Id
                                         JOIN rooms
                                         ON running_films.Room_ID = rooms.Room_ID
                                         JOIN cinemas
                                         ON cinemas.Cinema_ID = rooms.Cinema_ID
                                         WHERE running_films.Film_Id=:Film_Id AND cinemas.Cinema_ID=:Cinema_ID
                                          AND rooms.Room_ID=:Room_Id
                                         ORDER BY DATE_FORMAT(Run_Time, '%Y-%m-%d')";
        $RoomInfos = $getFilmInfo->getBookingDetail($para=["Film_Id"=>$filmId, "Cinema_ID"=>$cinemaId,"Room_Id"=>$roomId],$sql);
       // var_dump($RoomInfos);
        echo json_encode($RoomInfos);
    }


    public function chooseTime($filmId, $cinemaId, $roomId){

        $getFilmInfo = new FilmBookingModel();

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
        $RoomInfos = $getFilmInfo->getBookingDetail($para=["Film_Id"=>$filmId, "Cinema_ID"=>$cinemaId,"Room_Id"=>$roomId],$sql);
        echo json_encode($RoomInfos);
    }

    public function chooseSeats($roomId, $showTime, $cinemaId){
        //echo "Room ID:$roomId AND Show Time:$showTime";
        $getFilmInfo = new FilmBookingModel();

        $sql = "SELECT Seat_Name, available
                From seats WHERE Room_ID=:Room_ID AND Run_Time=:Run_Time";

        $RoomInfos = $getFilmInfo->getBookingDetail($para=["Room_ID"=>$roomId, "Run_Time"=>$showTime],$sql);

        $sql = "SELECT Cinema_Address
                From cinemas WHERE Cinema_ID=:Cinema_ID";
        $cinemaAddress = $getFilmInfo->getBookingDetail($para=["Cinema_ID"=>$cinemaId],$sql);
        $RoomInfos[]=$cinemaAddress;
        echo json_encode($RoomInfos);
    }


}