<?php

use Project\Classes\DB\DB;
include '../../autoloader.php';
$db = DB::getDB();
require_once '../Model/Filmadmin.php';
include 'manage_movie.php';
// Validate inputs
if (empty($title) || empty($releaseDate) || empty($cast) || empty($director) || empty($thumbnail) ) {
    echo "<span style='color:red;font-size:24px;'>";
    $error = "Invalid Movie data. Check all fields and try again.";
    echo $error;
    echo "</span>";
} else {
    // If valid, update the movie to the database
    $thumbnail = "/Assets/image/HomePage/"."thumb_".$file_get;
    $query = "UPDATE moviefeature SET title ='$title',releaseDate='$releaseDate',director ='$director',cast='$cast',img='$thumbnail' WHERE film_id = '$film_id'";
    $db->exec($query);

    // Display the Movie List page
    header('location: ../View/IndexMovies_AdminView.php');
}