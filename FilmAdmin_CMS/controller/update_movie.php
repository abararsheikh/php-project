<?php
use Project\Classes\DB\DB;
include '../../autoloader.php';
require_once '../Model/Filmadmin.php';
require_once 'manage_movie.php';
$db = DB::getDB();
// Validate inputs
if (empty($title) || empty($releaseDate) || empty($cast) || empty($director) || empty($thumbnail) ) {
    echo "<span style='color:red;font-size:24px;'>";
    $error = "Invalid Movie data. Check all fields and try again.";
    echo $error;
    echo "</span>";
} else {
    // If valid, update the movie to the database
    $thumbnail = "/Assets/image/HomePage/"."thumb_".$file_get;
    $updatingMovie = new Filmadmin();
    $updatingMovie->updateMovie($title,$releaseDate,$director,$cast,$thumbnail,$film_id);

    // Display the Movie List page
   // header('location: ../View/IndexMovies_AdminView.php');
    header('location: /admin/movie');
}