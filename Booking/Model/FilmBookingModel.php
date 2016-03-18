<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 3/10/2016
 * Time: 1:44 AM
 */
class FilmBookingModel extends TopRateModel{
    public function __construct(){

    }

    public function getFilmById($id){
        $db = new PDOOperation(DATA_SOURCE_NAME,DB_USERNAME,DB_PASSWORD);
        $result = $db->query("SELECT * FROM films WHERE Film_Id= :Film_Id;",$para = ["Film_Id"=>$id]);
        $fileName = $this->getFilmsName($result);
        $fo =new FileOperation();
        foreach($fileName as $value) {
            $fileArray = $fo->parseInfo($value);
            $filmDescription[] = $fileArray[0];
            $filmClickRate[] = $fileArray[1];
            $result->filmDiscription = $filmDescription;
            $result->filmClickRate = $filmClickRate;
        }

        $filmsInfo=[];
        foreach ($result->rows as $row){
            if(is_array($row)){
                $film =  new stdClass();
                foreach($row as $key=>$value){
                    $film ->$key = $value;
                }


                $filmsInfo[]=$film;
            }

        }
        for($i=0;$i<count($result->filmDiscription); $i++){
            $filmsInfo[$i]->filmDisc = $result->filmDiscription[$i];
        }

        for($i=0;$i<count($result->filmClickRate); $i++){
            $filmsInfo[$i]->filmClickNum = (int)$result->filmClickRate[$i];
        }

        return $filmsInfo;

    }

/*
 * get specific booking informations
 *
 *
 */
    function getBookingInfo($id,$query){
        //var_dump($id);
        $db = new PDOOperation(DATA_SOURCE_NAME,DB_USERNAME,DB_PASSWORD);
        $result = $db->query($query,$para = ["Film_Id"=>$id]);



        $Booking=[];
        foreach ($result->rows as $row){
            if(is_array($row)){
                $film =  new stdClass();
                foreach($row as $key=>$value){
                    $film ->$key = $value;
                }


                $Booking[]=$film;
            }

        }


    return $Booking;
    }

    function getBookingDetail($para, $query){
        $db = new PDOOperation(DATA_SOURCE_NAME,DB_USERNAME,DB_PASSWORD);

        $result = $db->query($query,$para);
        //var_dump($result);


        $Booking=[];
        foreach ($result->rows as $row){
            if(is_array($row)){
                $film =  new stdClass();
                foreach($row as $key=>$value){
                    $film ->$key = $value;
                }


                $Booking[]=$film;
            }

        }


        return $Booking;
    }

    function updateSeats($para, $query){
        $db = new PDOOperation(DATA_SOURCE_NAME,DB_USERNAME,DB_PASSWORD);

        $result = $db->execute($query,$para);
    }

}

?>