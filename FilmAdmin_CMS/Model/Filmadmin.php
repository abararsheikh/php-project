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
        $db->exec($query);

    }
    public function editMovie($film_id)
    {
        //connect to database :
        include '../../autoloader.php';
        $db = DB::getDB();
        //Execute the Query
        $sql = "SELECT * FROM moviefeature WHERE film_id = '$film_id'";
        $result = $db->query($sql);
        $editMovies = $result->fetch();
        return $editMovies;
    }
    public function displayMovie()
    {
        //connect to database :
        include '../../autoloader.php';
        $db = DB::getDB();
        //Execute the Query
        //get all the movies

        $queryAllMovies = 'SELECT * FROM moviefeature ORDER BY releaseDate DESC';
        $statement1 = $db->prepare($queryAllMovies);
        $statement1->execute();
        $allMovie = $statement1->fetchAll();
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
        return $indexMovie;
    }
}