<?php

use Project\Classes\DB\DB;

class Filmadmin
{
    public function deleteMovie($film_id)
    {
        //connect to database :
        include '../../autoloader.php';
        $db = DB::getDB();
        //Execute the Query
        $query = "DELETE FROM moviefeature
          WHERE film_id = '$film_id' ";
        $delMovies= $db->prepare($query);
        $delMovies->execute();

        $delMovies->closeCursor();

        //Once the Admin delete the Movie ..Delete the cookies also which is created

        setcookie("rating_".$film_id,1, time()- 2592000,'/');
    }
    public function editMovie($film_id)
    {
        //connect to database :
        include '../../autoloader.php';
        $db = DB::getDB();
        //Execute the Query
        $sql = "SELECT * FROM moviefeature WHERE film_id = '$film_id'";
        $result = $db->prepare($sql);
        $result->execute();
        $editMovies = $result->fetch();
        $result->closeCursor();

        return $editMovies;
    }
    public function displayMovie()
    {
        //connect to database :
        include '../../autoloader.php';
        $db = DB::getDB();
        //Execute the Query and //get all the movies

        $queryAllMovies = 'SELECT * FROM moviefeature ORDER BY releaseDate DESC';
        $statement1 = $db->prepare($queryAllMovies);
        $statement1->execute();
        $allMovie = $statement1->fetchAll();
        $statement1->closeCursor();

        return $allMovie;
    }
    /**
     * User View of Movies
     */

    public function movieIndex()
    {
        //connect to database :
        include '../../autoloader.php';
        $db = DB::getDB();
        //Execute the Query
        $queryAllMovies = 'SELECT * FROM moviefeature ORDER BY releaseDate DESC';
        $statement1 = $db->prepare($queryAllMovies);
        $statement1->execute();
        $indexMovie = $statement1->fetchAll();
        $statement1->closeCursor();

        return $indexMovie;
    }
// function for rating movies ..is used in rating.php file
    public function getMoviesID()
    {
        //connect to database :
        include '../autoloader.php';
        $db2 = DB::getDB();
        //Execute the Query
        $queryAllMoviesId ='SELECT film_id FROM moviefeature';
        $getId= $db2->prepare($queryAllMoviesId);
        $getId->execute();
        $getIds= $getId->fetchAll();
        $getId->closeCursor();

        return $getIds;
    }


}