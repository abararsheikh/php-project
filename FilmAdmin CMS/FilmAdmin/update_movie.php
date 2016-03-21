<?php

use Project\Classes\DB\DB;
$db = DB::getDB();
// Get the value from the form
//require_once('database.php');

$film_id = $_POST['film_id'];
$title = $_POST['title'];
$releaseDate = $_POST['releaseDate'];
$director = $_POST['director'];
$cast = $_POST['cast'];
//$img = $_POST['img1'];

// ====Get the Image
$file_get = $_FILES['img1']['name'];
$temp = $_FILES['img1']['tmp_name'];

$file_to_saved = "../Assets/image/HomePage/".$file_get;

//Documents folder, should exist in your host in there you're going to save the file just uploaded

move_uploaded_file($temp, $file_to_saved);

//==================

// Validate inputs
if (empty($title) || empty($releaseDate) || empty($cast) || empty($director) || empty($file_get) ) {
    $error = "Invalid Movie data. Check all fields and try again.";
    echo $error;
} else {
    // If valid, update the movie to the database

    $query = "UPDATE moviefeature SET title ='$title',releaseDate='$releaseDate',director ='$director',cast='$cast',img='$file_to_saved' WHERE film_id = '$film_id'";
    $db->exec($query);

    // Display the Movie List page
    header('location: movieindex.php');
}