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
        require_once "./View/HomePage1.php";
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




}