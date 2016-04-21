<?php
//connect to database
use Project\Classes\DB\DB;
include '../../autoloader.php';
require_once '../Model/Filmadmin.php';
require_once 'manage_movie.php';
// Validate inputs
if (empty($title) || empty($releaseDate) || empty($cast) || empty($director)) {
    $error = "Invalid Movie data. Please Check and fill all fields and then try again.";
    echo "<span style='color:red;font-size:24px;'>";
    echo $error;
    echo "</span>";
} else {
    // If valid, Add the movie to the database
    $thumbnail = "/Assets/image/HomePage/"."thumb_".$file_get;
    $query = "INSERT INTO moviefeature (title ,releaseDate,director,cast,img) VALUES ('$title','$releaseDate','$director','$cast','$thumbnail')";
    $db->exec($query);

    // Display the Movie List page
   header('location: ../View/IndexMovies_AdminView.php');
}

