<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 3/8/2016
 * Time: 9:45 AM
 */


class HomePageController {
    public function __construct(){
        echo "This is Home Controller <br/>";
    }
    //HTTP GET
    public function index(){
//        echo "This is Home Controller Index";
//        echo":value ";
        $getfilmInfo = new TopRateModel();
        $filmInfo = $getfilmInfo->getFilmInfo();
        $filmRate = $getfilmInfo->topRate();

        //var_dump($filmInfo);
        require_once "./View/HomePage1.php";
    }

    public function chooseCinema($filmId){
            //echo "This is Homepage chooseCinema";
        $getFilmInfo = new FilmBookingModel();
        $sql="SELECT DISTINCT(cinemas.Cinema_ID),cinemas.Cinema_Name
                              FROM films JOIN running_films
                                          ON films.Film_Id = running_films.Film_Id
                                         JOIN rooms
                                         ON running_films.Room_ID = rooms.Room_ID
                                         JOIN cinemas
                                         ON cinemas.Cinema_ID = rooms.Cinema_ID
                                         WHERE running_films.Film_Id=:Film_Id;";

        $CinemaInfos = $getFilmInfo->getBookingInfo($filmId,$sql);
        echo json_encode($CinemaInfos);
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

    //HTTP POST
    public function postToBooking($filmId){

        //get film

        $getFilmInfo = new FilmBookingModel();
        $changeRate = new TopRateModel();

        $filmInfo = $getFilmInfo->getFilmById($filmId);

        $changeRate->clickNumber($filmInfo[0]->film_description);
        $sql="SELECT DISTINCT(cinemas.Cinema_ID),cinemas.Cinema_Name
                              FROM films JOIN running_films
                                          ON films.Film_Id = running_films.Film_Id
                                         JOIN rooms
                                         ON running_films.Room_ID = rooms.Room_ID
                                         JOIN cinemas
                                         ON cinemas.Cinema_ID = rooms.Cinema_ID
                                         WHERE running_films.Film_Id=:Film_Id;";

        $CinemaInfos = $getFilmInfo->getBookingInfo($filmId,$sql);



        require_once "./View/Booking.php";

    }

    public function toBookingPage(){
        //echo "this is toBookingPage";

        $filmInfo = explode('| ',$_POST['filmInfo']);
        //var_dump($filmInfo);
        $item = new stdClass();
        $item->Film_Name =$filmInfo[0];
        $item->FilmId =$_POST['select-movie'];
        $item->Cinema_ID =$_POST['CinemaName'];
        $item->Cinema =$filmInfo[1];
        $item->Room_ID = $_POST['Room'];
        $item->Room = $filmInfo[2];
        $item->showDate =$filmInfo[3];
        $item->showTime = $filmInfo[4];
        $item->Run_Time =$filmInfo[5];
        //$item->Room_ID = $_POST['']
       // var_dump($item);
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
        //var_dump($TimeInfos);
        require_once "./View/Booking.php";
    }



}